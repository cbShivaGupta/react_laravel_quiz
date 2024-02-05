<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use function PHPUnit\Framework\isNull;
use Illuminate\Support\Str;
use App\Mail\Mymail;

use Illuminate\Support\Facades\Mail;


class Bookcontroller extends Controller
{
  public function index()
  {
    // $res="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus nisl, consequat eu velit sed, iaculis feugiat nisl. Aenean maximus a felis non pharetra. Curabitur pellentesque sapien vitae lorem tincidunt ultricies. Sed sed sollicitudin erat. Quisque ac vestibulum augue. Donec auctor maximus ex. Suspendisse sodales vehicula dolor, ut maximus erat dictum vitae. Phasellus lacus elit, sollicitudin non arcu ut, volutpat posuere lectus. Proin ornare semper vestibulum.";
    $res = DB::table('books')->get();
    return response()->json($res);
  }
  public function store(Request $req)
  {
    $book_name = $req->name;
    return $book_name;
    $author_name = $req->author;
    $no_of_pages = $req->pages;
    $result = DB::table('books')->insert(['name' => $book_name, 'author_name' => $author_name, 'no_of_pages' => $no_of_pages]);
    return response()->json(['message' => 'Book added'], 201);
  }
  public function cancelticket(Request $req)
  {
    $booking_id = $req->booking_ids;
    $trainidquery = DB::table('bookings')->where('booking_id', $booking_id)->get();
    $train_id = $trainidquery[0]->train_id;
    $delete_booking = DB::table('bookings')->where('booking_id', $booking_id)->delete();
    $update_seat = DB::table('train_details')->where('id', $train_id)->increment('total_seats');
    if ($delete_booking && $update_seat) {
      return response()->json(['message' => 'Ticket Cancelled'], 201);
    }
    // $cancel=DB::table('')
  }
  public function showmybookings(Request $req)
  {
    $booking_details = [];
    $user_id = $req->user_id;
    $result = DB::table('users')->join('bookings', 'users.id', 'bookings.user_id')->join('train_details', 'bookings.train_id', 'train_details.id')->where('users.id', $user_id)->get();
    return response()->json($result);
  }
  public function register(Request $req)
  {
    $user_name = $req->input('fname');
    $user_email = $req->input('umail');
    $user_password = $req->input('upass');
    $result = DB::table('users')->insert([
      'name' => $user_name,
      'email' => $user_email,
      'password' => md5($user_password),
      'role' => 2
    ]);
    if ($result) {
      return response()->json(['message' => 'User added'], 201);
    } else {
      return response()->json(['message' => 'Failed to add user'], 400);
    }
  }
  public function login(Request $req)
  {
    // $user_name = $req->input('fname');
    $user_email = $req->input('umail');
    $user_password = $req->input('upass');
    $user_token = Str::random(60);
    $result = DB::table('users')->where(
      'email',
      $user_email
    )->where(
      'password',
      md5($user_password)
    )->get();
    $role = $result[0]->role;
    $user_id = $result[0]->id;
    $user_name=$result[0]->name;
    if (count($result) > 0) {
      session()->put('userid', $result[0]->id);
      return response()->json(['role' => $role, 'user_id' => $user_id, 'user_token' => $user_token,'uname'=>$user_name], 203);
    } else {
      return response()->json(['message' => 'error'], 400);
    }
  }
  public function addtrain(Request $req)
  {
    $train_name = $req->input('train_name');
    $train_number = $req->input('train_number');
    $train_sourcestation = $req->input('train_sourcestation');
    $train_destinationstation = $req->input('train_destinationstation');
    $train_departuretime_hr = $req->input('train_departuretime_hr');
    $train_departuretime_min = $req->input('train_departuretime_min');
    $train_departuretime_sec = $req->input('train_departuretime_sec');
    $train_arrivaltime_hr = $req->input('train_arrivaltime_hr');
    $train_arrivaltime_min = $req->input('train_arrivaltime_min');
    $train_arrivaltime_sec = $req->input('train_arrivaltime_sec');
    $train_departuredate = $req->input('train_departuredate');
    $train_arrivaldate = $req->input('train_arrivaldate');
    $train_departuretime = $train_departuretime_hr . ':' . $train_departuretime_min . ':' . $train_departuretime_sec;
    $train_arrivaltime = $train_arrivaltime_hr . ':' . $train_arrivaltime_min . ':' . $train_arrivaltime_sec;
    $result = DB::table('train_details')->insert([
      'train_name' => $train_name,
      'source_station' => $train_sourcestation,
      'destination_station' => $train_destinationstation,
      'departure_time' => $train_departuretime,
      'arrival_time' => $train_arrivaltime,
      'train_no' => $train_number,
      'departure_date' => $train_departuredate,
      'arrival_date' => $train_arrivaldate
    ]);
    if ($result) {
      return response()->json(['message' => 'Train added'], 201);
    } else {
      return response()->json(['message' => 'Failed to add train'], 400);
    }
  }
  public function searchtrain(Request $req)
  {
    $train_sourcestation = $req->input('train_sourcestation');
    $train_destinationstation = $req->input('train_destinationstation');
    $train_departuredate = $req->input('train_departuredate');
    // $train_arrivaldate=$req->input('train_arrivaldate');
    $result = DB::table('train_details')->where('source_station', $train_sourcestation)->where('destination_station', $train_destinationstation)->where('departure_date', $train_departuredate)->get();
    if (count($result) > 0) {
      return response()->json($result, 200);
    } else {
      return response()->json(['message' => 'No trains found for this route'], 400);
    }
  }
  public function searchsourcestation(Request $req)
  {
    $train_sourcestation = $req->train_sourcestation;
    $result = DB::table('train_details')
      ->select('source_station')
      ->distinct()
      ->where('source_station', 'LIKE', $train_sourcestation . '%')
      ->get();
    // $result=DB::table('train_details')->where('source_station','LIKE',$train_sourcestation.'%')->get('source_station');
    return response()->json($result, 200);
  }
  public function searchdestinationstation(Request $req)
  {
    $train_destinationstation = $req->train_destinationstation;
    $result = DB::table('train_details')
      ->select('destination_station')
      ->distinct()
      ->where('destination_station', 'LIKE', $train_destinationstation . '%')
      ->get();
    // $result=DB::table('train_details')->where('destination_station','LIKE',$train_destinationstation.'%')->get('destination_station');
    return response()->json($result, 200);
  }
  public function show($id)
  {
    $res = DB::table('books')->where('id', $id)->get();
    if (!empty($res)) {
      return response()->json($res);
    } else {
      return response()->json(['message' => 'Book not found'], 404);
    }
  }
  public function update(Request $req, $id)
  {
    $res = DB::table('books')->where('id', $id)->get();
    if (!empty($res)) {
      $book_name = $req->name;
      $author_name = $req->author;
      $no_of_pages = $req->pages;
      if ($book_name == '') {
        // return response()->json($author_name);
        $book_name = $res[0]->name;
      }
      if ($author_name == '') {
        $author_name = $res[0]->author_name;
      }
      if ($no_of_pages == '') {
        $no_of_pages = $res[0]->no_of_pages;
      }
      $update =   DB::table('books')->where('id', $id)->update([
        'name' => $book_name,
        'author_name' => $author_name,
        'no_of_pages' => $no_of_pages
      ]);
      if ($update) {
        return response()->json(['msg' => 'Data updated succesfully'], 404);
      }
    } else return response()->json(['msg' => 'Id not found'], 404);
  }
  public function bookticket(Request $req)
  {
    $train = [];
    $train_id = $req->train_id;
    $user_id = $req->user_id;
    $train['passenger_name'] = $req->passenger_name;
    $train['passenger_email'] = $req->passenger_email;
    $query = DB::table('train_details')->where('id', $train_id)->get();
    $train['source_station'] = $query[0]->source_station;
    $train['destination_station'] = $query[0]->destination_station;
    $train['departure_time'] = $query[0]->departure_time;
    $train['arrival_time'] = $query[0]->arrival_time;
    $train['train_name'] = $query[0]->train_name;
    $train['train_no'] = $query[0]->train_no;
    $train['departure_date'] = $query[0]->departure_date;
    $train['arrival_date'] = $query[0]->arrival_date;
    $total_seats = $query[0]->total_seats;
    if ($total_seats != 100) {
      $lastInsertedValue = DB::table('bookings')->where('train_id', $train_id)
        ->select('seat_number')
        ->orderBy('id', 'desc') // Assuming you have an auto-increment 'id' column
        ->first();
      $value = $lastInsertedValue->seat_number;
      $seat_no = $value + 1;
    } else {
      $seat_no = 1;
    }
    $train['seat_no'] = $seat_no;
    $string = $train['departure_date'];
    $firstTwoChars = substr($string, 9, 11);
    $booking_id = $train_id . $firstTwoChars . $user_id . $seat_no;
    $train['booking_id'] = $booking_id;
    $insert_booking = DB::table('bookings')->insert([
      'name' => $req->passenger_name,
      'train_id' => $train_id,
      'user_id' => $user_id,
      'email_id' => $req->passenger_email,
      'departure_date' => $query[0]->departure_date,
      'seat_number' => $seat_no,
      'booking_id' => $booking_id
    ]);
    $seat_update = DB::table('train_details')
      ->where('id', $train_id)
      ->decrement('total_seats');
    if ($insert_booking && $seat_update) {
      return response()->json($train, 201);
    }
  }
  public function subjectforquiz()
  {
    $result = DB::table('subjects')->get();
    return response()->json($result, 200);
  }
  public function getquestions(Request $req)
  {
    $subject_id = $req->subject;
    $result = DB::table('questions')
      ->join('answers', 'questions.id', '=', 'answers.question_id')
      ->where('subject_id', $subject_id)
      ->select('questions.id as question_id', 'answers.id as answer_id', 'questions.*', 'answers.*')
      ->get();
    return response()->json($result, 200);
  }
  public function fetchtime(Request $req)
  {
    $subject_id = $req->subject;
    $result = DB::table('subjects')->where('id', $subject_id)->get();
    $subject_time = $result[0]->quiz_time;
    return response()->json($subject_time, 200);
  }
  public function submitresponse(Request $req)
  {
    $subject_id = $req->subject_id;
    $response_list = $req->response_list;
    $user_id = $req->user_id;
    // $type=gettype($response_list);
    // $user_id=session()->get('userid');
    for ($i = 0; $i < count($response_list); $i++) {
      $fc = strpos($response_list[$i], '_');
      $lc = strrpos($response_list[$i], '_');
      $response = substr($response_list[$i], 0, $fc);
      $question_id = substr($response_list[$i], $lc + 1, strlen($response_list[$i]) - 1);
      $result = DB::table('responses')->insert([
        'user_id' => $user_id,
        'subject_id' => $subject_id,
        'response' => $response,
        'question_id' => $question_id
      ]);
    }
    // return response()->json($user_id, 200);
    return response()->json(['msg' => 'Response recorded'], 200);
  }
  public function addsubject(Request $req)
  {
    $subject_name = $req->subject_name;
    $quiz_hour = $req->quizhour;
    $quiz_min = $req->quizmin;
    $quiz_sec = $req->quizsec;
    $quiz_time = $quiz_hour . ':' . $quiz_min . ':' . $quiz_sec;
    $insert_subject = DB::table('subjects')->insert(['subject_name' => $subject_name, 'quiz_time' => $quiz_time]);
    if ($insert_subject) {
      return response()->json(['msg' => 'Subject added'], 200);
    }
  }
  public function addquestion(Request $req)
  {
    $subject_id = $req->subject_id;
    $question = $req->question;
    $option1 = $req->option1;
    $option2 = $req->option2;
    $option3 = $req->option3;
    $option4 = $req->option4;
    $correct_option = $req->correctOption;
    // Insert the question
    $insert_question = DB::table('questions')->insert([
      'question' => $question,
      'subject_id' => $subject_id,
      // Add other columns and their values as needed
    ]);
    // Get the last inserted ID
    $lastInsertedId = DB::table('questions')->orderBy('id', 'desc')->value('id');
    $insert_answers = DB::table('answers')->insert([
      'option1' => $option1,
      'option2' => $option2,
      'option3' => $option3,
      'option4' => $option4,
      'question_id' => $lastInsertedId,
      'correct_option' => $correct_option
    ]);
    // Construct the response in JSON format
    $responseJson = json_encode([
      'lastInsertedId' => $lastInsertedId,
    ]);
    // Return the JSON response
    return response()->json($responseJson);
  }
  public function fetchrecords(Request $req)
  {
    $user_id = $req->user_id;
    $filter_id = $req->filter_id;
    if ($filter_id == 1) {
      $record_date = $req->record_date;
      $res = DB::table('responses')->join('subjects', 'responses.subject_id', '=', 'subjects.id')->join('questions', 'responses.question_id', '=', 'questions.id')->join('answers', 'responses.question_id', '=', 'answers.question_id')->where('responses.user_id', $user_id)->where('responses.date', $record_date)->get();
      return response()->json($res);
    }
    if ($filter_id == 2) {
      $selected_subject = $req->selected_subject;
      $res = DB::table('responses')->join('subjects', 'responses.subject_id', '=', 'subjects.id')->join('questions', 'responses.question_id', '=', 'questions.id')->join('answers', 'responses.question_id', '=', 'answers.question_id')->where('responses.user_id', $user_id)->where('subjects.id', $selected_subject)->get();
      return response()->json($res);
    }
    if ($filter_id == 3) {
      $selected_subject = $req->selected_subject;
      $record_date = $req->record_date;
      $res = DB::table('responses')->join('subjects', 'responses.subject_id', '=', 'subjects.id')->join('questions', 'responses.question_id', '=', 'questions.id')->join('answers', 'responses.question_id', '=', 'answers.question_id')->where('responses.user_id', $user_id)->where('responses.date', $record_date)->where('subjects.id', $selected_subject)->get();
      return response()->json($res);
    }
  }
  public function updatepassword(Request $req)
  {
    $user_mail = $req->umail;
    $user_pass = $req->upass;
    $search_user = DB::table('users')->where('email', $user_mail)->get();
    if (count($search_user) == 0) {
      return response()->json(['msg' => 'There is no user associated with the given email adddress'], 400);
    } else {
      $update_password = DB::table('users')->where('email', $user_mail)->update([
        'password' => md5($user_pass)
      ]);
      if ($update_password) {
        return response()->json(['msg' => 'Password Updated Successfully'], 202);
      } else {
        return response()->json(['msg' => 'Some error occured.Please retry after some times'], 400);
      }
    }
  }
  public function googlelogin(Request $req)
  {
    $user_mail = $req->user_mail;
    $user_scret = $req->user_secret;
    $user_name = $req->user_name;
    $user_token = Str::random(60);
    $check_user = DB::table('users')->where('email', $user_mail)->where('google_secret_id', $user_scret)->where('google_user', 1)->get();
    if (count($check_user) == 0) {
      $insert_google_users = DB::table('users')->insert([
        'name' => $user_name,
        'email' => $user_mail,
        'role' => 2,
        'google_secret_id' => $user_scret,
        'google_user' => 1
      ]);
    }
    return response()->json(['msg' => 'User registered successfully', 'user_token' => $user_token,'username'=>$user_name], 202);
  }
  public function checkpreviousattempstatus(Request $req)
  {
    $user_id = $req->user_id;
    $subject_id = $req->selected_subject;
    $checkstatus = DB::table('responses')->where('user_id', $user_id)->where('subject_id', $subject_id)->get();
    if (count($checkstatus) > 1) {
      return  response()->json(['msg' => "You have no free trials remaining for this subject quiz"], 202);
    } else {
      return  response()->json(['msg' => "You have no free trials remaining for this subject quiz"], 404);
    }
  }
  public function getsearchedsubject(Request $req)
  {
    $searchsubject = $req->searchsubject;
    // $subject=[];
    $getsubject = DB::table('subjects')->where('subject_name', $searchsubject)->get();
    if (count($getsubject) > 0) {
      $subject_id = $getsubject[0]->id;
      $subject_name = $getsubject[0]->subject_name;

      return response()->json(['subject_id' => $subject_id, 'subject_name' => $subject_name], 202);
    } else {
      return response()->json(['msg' => "No subject found"], 404);
    }
  }
  public function fetchalldata()
  {
    $users = DB::table('users')->get();
    $totalusers = count($users);
    $subjects = DB::table('subjects')->get();
    $totalsubjects = count($subjects);

    $questions = DB::table('questions')->get();
    $totalquestions = count($questions);
    return response()->json(['totalusers' => $totalusers, 'totalsubjects' => $totalsubjects, 'totalquestions' => $totalquestions], 202);
  }
  public function fetchtrendingquiz()
  {
    $results = DB::table('responses')
      ->join('subjects', 'responses.subject_id', '=', 'subjects.id')
      ->select('responses.subject_id', 'subjects.subject_name', DB::raw('COUNT(responses.subject_id) AS B_count'))
      ->groupBy('responses.subject_id', 'subjects.subject_name')
      ->having('B_count', '>', 1)
      ->orderByDesc('B_count')
      ->limit(3)
      ->get();
    return response()->json($results);
  }
  public function geteditsubjectdetails(Request $req)
  {
    $subject_id = $req->subject_id;
    $result = DB::table('subjects')->join('questions', 'subjects.id', '=', 'questions.subject_id')->join('answers', 'questions.id', '=', 'answers.question_id')->where('subjects.id', $subject_id)->get();
    return response()->json($result);
  }
  public function updateSubject(Request $req)
  {
    $subject_id = $req->subject_id;
    $question_id = $req->question_id;
    $answer_id = $req->answer_id;
    $question = $req->question;
    $option1 = $req->option1;
    $option2 = $req->option2;
    $option3 = $req->option3;
    $option4 = $req->option4;
    $correct_option = $req->correct_option;
    $updatequestion = DB::table('questions')->where('id', $question_id)->update(['question' => $question]);
    $updateanswer = DB::table('answers')->where('id', $answer_id)->update(['option1' => $option1, 'option2' => $option2, 'option3' => $option3, 'option4' => $option4, 'correct_option' => $correct_option]);
    if ($updatequestion || $updateanswer) {
      return response()->json(['msg' => 'Quiz updated succesfully'], 202);
    } else {
      return response()->json(['msg' => 'Some error occured'], 404);
    }
  }
  public function deleteQuestion(Request $req)
  {
    $question_id = $req->question_id;
    $answer_id = $req->answer_id;
    $delete_question = DB::table('questions')->where('id', $question_id)->delete();
    $delete_answer = DB::table('answers')->where('id', $answer_id)->delete();
    if ($delete_question && $delete_answer) {
      return response()->json(['msg' => 'Question deleted succesfully'], 202);
    } else {
      return response()->json(['msg' => 'Some error occured'], 404);
    }
  }
  public function deletesubject(Request $req)
  {
    // $question_ids=[];
    $subject_id = $req->subject_id;
    $query = DB::table('questions')->where('subject_id', $subject_id)->get('id');
    for ($i = 0; $i < count($query); $i++) {
      $question_ids = $query[$i]->id;
      DB::table('answers')->where('question_id', $question_ids)->delete();
    }
    $delete_subject = DB::table('subjects')->where('id', $subject_id)->delete();
    $delete_questions = DB::table('questions')->where('subject_id', $subject_id)->delete();
    return response()->json(['msg' => 'Deleted sucesfully'], 200);
  }
  public function subscribe(Request $req)
  {
    $email_address = $req->email_address;
    $check = DB::table('subscribers')->where('email_address', $email_address)->get();
    if (count($check) > 0) {
      return response()->json(['msg' => 'Email is already subscribed'], 202);
    } else {
      $insert_record = DB::table('subscribers')->insert(['email_address' => $email_address]);
      if ($insert_record) {
        return response()->json(['msg' => 'Subscription added succesfully'], 200);
      }
    }
  }
  public function getsubscriberdetails()
  {
    $subscribers=DB::table('subscribers')->get();
    return response()->json($subscribers);
  }
  public function sendmail(Request $req)
  {
      $content = $req->content;
      $to = $req->to;
      $subject = $req->subject;
      // return response()->json($content);
  
      try {
          Mail::to($to)->send(new Mymail($content, $to, $subject));
          
          return response()->json(['msg' => 'Email sent successfully'], 200);
      } catch (\Exception $e) {
          return response()->json(['msg' => 'Error sending email', 'error' => $e->getMessage()], 500);
      }
  }
  public function fetchprofile(Request $req)
  {
    $userid=$req->userid;
    $getuserdata=DB::table('users')->where('id',$userid)->get();
    $username=$getuserdata[0]->name;
    $usermail=$getuserdata[0]->email;
    $userpass=$getuserdata[0]->password;
    $userpic=$getuserdata[0]->profile_picture;
    $designation=$getuserdata[0]->designation;
    $city=$getuserdata[0]->city;

    $backenedbaseurl = url('/');

    return response()->json(['username'=>$username,'backenedbaseurl'=>$backenedbaseurl,'usermail'=>$usermail,'userpass'=>$userpass,'userpic'=>$userpic,'designation'=>$designation,'city'=>$city],200);

  }
  public function updateprofile(Request $req)
  {
    $userid=$req->userid;
    $username=$req->username;
    $usermail=$req->usermail;
    $userpass=$req->userpass;
    $designation=$req->designation;
    $city=$req->city;


if($req->image_changed==1){
    $userpic=$req->userpic;

    $imageName = time() . '.' . $userpic->getClientOriginalExtension();
    $userpic->move(public_path('uploads'), $imageName);}
    else{
      $imageName=null;
    }
           
            $updateprofile=DB::table('users')->where('id',$userid)->update([
              'name'=>$username,
              'email'=>$usermail,
              'password'=>md5($userpass),
              'profile_picture'=>$imageName,
              'designation'=>$designation,
              'city'=>$city
            ]);

            return response()->json(['message' => 'Updated successfully'],200);


  }
  public function updatesubjecttime(Request $req)
  {
      try {
          $subject_id = $req->subject_id;
          $hour = $req->hour;
          $minute = $req->minute;
          $second = $req->second;
  
          // Format the time
          $quiz_time = sprintf('%02d:%02d:%02d', $hour, $minute, $second);
  
          $updatequiztime = DB::table('subjects')->where('id', $subject_id)->update([
              'quiz_time' => $quiz_time,
          ]);
  
          if ($updatequiztime) {
              return response()->json(['message' => 'Time updated successfully'], 200);
          } else {
              return response()->json(['message' => 'Failed to update time'], 400);
          }
      } catch (\Exception $e) {
          // Log the exception or handle it based on your requirements
          return response()->json(['message' => 'Internal server error'], 500);
      }
  }
  public function fetchuserperformance(Request $req)
  {
      try {
          $userid = $req->user_id;
  
          // Query to get total questions
          $totalQuestionsQuery = DB::table('responses')->where('user_id', $userid)->get();
          $totalQuestions = count($totalQuestionsQuery);
  
          // Query to get total subjects
          $totalSubjectsQuery = DB::table('responses')
              ->select('subject_id', DB::raw('count(*) as total_subjects'))
              ->where('user_id', $userid)
              ->groupBy('subject_id')
              ->get();

              $correct_responses=DB::table('responses')->join('answers','responses.question_id','answers.question_id') ->where(DB::raw('LOWER(responses.response)'), '=', DB::raw('LOWER(answers.correct_option)'))->where('responses.user_id', $userid)->count();
             
          
          // The result is an array of stdClass objects, so you can access the count like this:
          // $correct_responses_count = $correct_responses->count();
           
  
          return response()->json(['total_questions' => $totalQuestions, 'total_subjects' => count($totalSubjectsQuery),'total_correct'=>$correct_responses], 200);
      } catch (\Exception $e) {
          // Log the error or handle it appropriately
          return response()->json(['error' => 'Error fetching user performance'], 500);
      }
  }
  public function fetcallrecords()
  {
    $total_users=DB::table('users')->where('role',2)->count();
    $total_subscribers=DB::table('subscribers')->count();
    $total_subjects=DB::table('subjects')->count();
    return response()->json(['total_users'=>$total_users,'total_subscribers'=>$total_subscribers, 'total_subjects'=>$total_subjects],200);
  }
  
}
