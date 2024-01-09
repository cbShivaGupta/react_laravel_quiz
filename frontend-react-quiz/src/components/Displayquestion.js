import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import {
  Typography,
  Paper,
  Radio,
  RadioGroup,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";

const user_id = localStorage.getItem("userid");

const DisplayQuestion = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  if (uid && role === "2") {
    // Do something for authenticated users with role 2
  } else {
    window.location.href = "/login";
  }

  const { selectedSubject } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState([]);
  const [fulltime, setfullTime] = useState([]);

  const [isVisible, setVisible] = useState(false);
  const [isbuttonVisible, setisbuttonVisible] = useState(true);

  const [timerId, setTimerId] = useState(null);
  const[time,setTime]=useState('');

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getquestions?subject=${selectedSubject}`
      );
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        setQuestions(data);
        setSelectedValues(Array(data.length).fill(""));
      } else {
        const text = await response.text();
        console.error("Invalid JSON response. Response body:", text);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(error);
    }
  };

  const fetchTime = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/fetchtime?subject=${selectedSubject}`
      );
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        const timeString = await response.json();
        setfullTime(timeString)
        console.log("Fetched quiz time:", timeString); // Add this line for debugging
  
        let timeArray = timeString.split(":");
        let hour = parseInt(timeArray[0], 10);
        let minute = parseInt(timeArray[1], 10);
        let second = parseInt(timeArray[2], 10);
        let quiztime = (hour * 60 * 60 + minute * 60 + second) * 1000;
        console.log("Converted quiz time:", quiztime); // Add this line for debugging
  
        setLoading(false);
        return quiztime;
      } else {
        const text = await response.text();
        console.error("Invalid JSON response. Response body:", text);
      }
    } catch (error) {
      console.error("Error fetching time:", error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestions();
      const quiztime = await fetchTime();
    
      setTimer(quiztime);
      // setTime(quiztime)
    };

    fetchData();
  }, [selectedSubject]);

  

  const handleRadioChange = (index, value) => {
    setSelectedValues((prevSelectedValues) => {
      const updatedValues = [...prevSelectedValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  const startQuiz = async () => {
    try {
      setisbuttonVisible(false);
  
      // Fetch quiz time
      const quiztime = await fetchTime();
      setTime(quiztime);
  
      const timerInterval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            handleSubmit();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
  
      // Save the timerInterval ID so we can clear it later
      setTimerId(timerInterval);
  
      setVisible(!isVisible);
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };
  
  const getformattedtime=(milliseconds)=>{
    const totalformattedseconds=parseInt(Math.floor(milliseconds/1000))
    const totalformattedminutes=parseInt(Math.floor(totalformattedseconds/60))
    const totalformattedhours=parseInt(Math.floor(totalformattedminutes/60))
    const loopseconds=parseInt(Math.floor(totalformattedseconds%60))
    const loopminutes=parseInt(Math.floor(totalformattedminutes%60))
    const loophours=parseInt(Math.floor(totalformattedhours%24))
    // return `${milliseconds}`
    return `${loophours}:${loopminutes}:${loopseconds}`



  }

  const handleSubmit = async () => {
    clearTimeout(timerId);

    setSubmitted(true);
    console.log('text',selectedValues)
    const user_id = localStorage.getItem("userid");

    const apiUrl = "http://127.0.0.1:8000/api/submitresponse";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject_id: selectedSubject,
        user_id: user_id,
        response_list: selectedValues,
      }),
    });

    const data2 = await response.json();
    if (response.status === 200) {
      toastr.success(data2.msg);
      setSubmitted(false)
    }
  };

  return (
    <>
     { isbuttonVisible && (<p>You have {fulltime}  to attempt all questions.Click on the button below to start the quiz <br/><Button onClick={startQuiz}>Start Quiz</Button></p>)}
      {isVisible   && (
        <div>

          <Grid container>
            <Grid item xs={1.8}>
              <Sidebar user_id={user_id} />
            </Grid>
            <Grid item xs={9}>
              <Container maxWidth="md">
               <p>Total time remaining:<p style={{fontSize:"30px"}} >{getformattedtime(time)}</p></p>
                <Paper
                  elevation={3}
                  style={{ padding: "20px", marginTop: "20px" }}
                >
                  {loading && <CircularProgress />}
                  {error && (
                    <Typography variant="h6">Error: {error.message}</Typography>
                  )}

                  {questions.length === 0 && !loading && (
                    <Typography variant="h6">
                      No questions found for the selected subject.
                    </Typography>
                  )}

                  {questions.length > 0 && (
                    <div>
                      {questions.map((question, index) => (
                        <div
                          key={question.question_id}
                          style={{ marginBottom: "20px" }}
                        >
                          <Typography variant="h6">
                            Q{index + 1}: {question.question}
                          </Typography>
                          <RadioGroup
                            value={selectedValues[index]}
                            onChange={(event) =>
                              handleRadioChange(index, event.target.value)
                            }
                          >
                            <div>
                              1.<span> {question.option1}</span>
                              <Radio
                                value={`option1_${index + 1}_${
                                  question.question_id
                                }`}
                                checked={
                                  selectedValues[index] ===
                                  `option1_${index + 1}_${question.question_id}`
                                }
                                onChange={(event) =>
                                  handleRadioChange(index, event.target.value)
                                }
                              />
                            </div>
                            <div>
                              2.<span> {question.option2}</span>
                              <Radio
                                value={`option2_${index + 1}_${
                                  question.question_id
                                }`}
                                checked={
                                  selectedValues[index] ===
                                  `option2_${index + 1}_${question.question_id}`
                                }
                                onChange={(event) =>
                                  handleRadioChange(index, event.target.value)
                                }
                              />
                            </div>
                            <div>
                              3. <span> {question.option3}</span>
                              <Radio
                                value={`option3_${index + 1}_${
                                  question.question_id
                                }`}
                                checked={
                                  selectedValues[index] ===
                                  `option3_${index + 1}_${question.question_id}`
                                }
                                onChange={(event) =>
                                  handleRadioChange(index, event.target.value)
                                }
                              />
                            </div>
                            <div>
                              4. <span>{question.option4}</span>
                              <Radio
                                value={`option4_${index + 1}_${
                                  question.question_id
                                }`}
                                checked={
                                  selectedValues[index] ===
                                  `option4_${index + 1}_${question.question_id}`
                                }
                                onChange={(event) =>
                                  handleRadioChange(index, event.target.value)
                                }
                              />
                            </div>
                          </RadioGroup>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={submitted}
                      >
                        Submit
                      </Button>
                      {submitted && (
                        <Typography variant="h6">
                          Answers submitted successfully!
                        </Typography>
                      )}
                    </div>
                  )}
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default DisplayQuestion;
