<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Bookcontroller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/books',[Bookcontroller::class,'index']);
Route::post('/books',[Bookcontroller::class,'store']);
Route::post('/register',[Bookcontroller::class,'register']);
Route::post('/login',[Bookcontroller::class,'login']);
Route::post('/addtrain',[Bookcontroller::class,'addtrain']);
Route::post('/searchtrain',[Bookcontroller::class,'searchtrain']);
Route::post('/searchsourcestation',[Bookcontroller::class,'searchsourcestation']);
Route::post('/searchdestinationstation',[Bookcontroller::class,'searchdestinationstation']);
Route::post('/bookticket',[Bookcontroller::class,'bookticket']);
Route::post('/showmybookings',[Bookcontroller::class,'showmybookings']);
Route::post('/cancelticket',[Bookcontroller::class,'cancelticket']);
Route::get('/subjectforquiz',[Bookcontroller::class,'subjectforquiz']);
Route::get('/getquestions',[Bookcontroller::class,'getquestions']);
Route::post('/submitresponse',[Bookcontroller::class,'submitresponse']);
Route::post('/addsubject',[Bookcontroller::class,'addsubject']);
Route::post('/addquestion',[Bookcontroller::class,'addquestion']);
Route::post('/fetchrecords',[Bookcontroller::class,'fetchrecords']);
Route::post('/updatepassword',[Bookcontroller::class,'updatepassword']);
Route::post('/googlelogin',[Bookcontroller::class,'googlelogin']);
Route::get('/fetchtime',[Bookcontroller::class,'fetchtime']);
// checkpreviousattempstatus
Route::post('/checkpreviousattempstatus',[Bookcontroller::class,'checkpreviousattempstatus']);
Route::post('/getsearchedsubject',[Bookcontroller::class,'getsearchedsubject']);
Route::get('/fetchalldata',[Bookcontroller::class,'fetchalldata']);
Route::get('/fetchtrendingquiz',[Bookcontroller::class,'fetchtrendingquiz']);
Route::post('/geteditsubjectdetails',[Bookcontroller::class,'geteditsubjectdetails']);
Route::post('/updateSubject',[Bookcontroller::class,'updateSubject']);
Route::post('/deleteQuestion',[Bookcontroller::class,'deleteQuestion']);
Route::post('/deletesubject',[Bookcontroller::class,'deletesubject']);
Route::post('/subscribe',[Bookcontroller::class,'subscribe']);
Route::get('/getsubscriberdetails',[Bookcontroller::class,'getsubscriberdetails']);
Route::post('/sendmail',[Bookcontroller::class,'sendmail']);
Route::post('/fetchprofile',[Bookcontroller::class,'fetchprofile']);
Route::post('/updateprofile',[Bookcontroller::class,'updateprofile']);
Route::post('/updatesubjecttime',[Bookcontroller::class,'updatesubjecttime']);

Route::post('/fetchuserperformance',[Bookcontroller::class,'fetchuserperformance']);
Route::post('/fetchalluserperformance',[Bookcontroller::class,'fetchalluserperformance']);
Route::get('/fetcallrecords',[Bookcontroller::class,'fetcallrecords']);




















































Route::get('/books/{id}',[Bookcontroller::class,'show']);
Route::put('/books/{id}',[Bookcontroller::class,'update']);