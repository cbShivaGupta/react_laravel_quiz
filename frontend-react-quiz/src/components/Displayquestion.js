import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
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
  const [timerId, setTimerId] = useState(null);
  const [time, setTime] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [isAfterSubmit, setAfterSubmit] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [fulltime, setFullTime] = useState([]);
  const selectedValuesRef = useRef(selectedValues);

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
        setFullTime(timeString);

        let timeArray = timeString.split(":");
        let hour = parseInt(timeArray[0], 10);
        let minute = parseInt(timeArray[1], 10);
        let second = parseInt(timeArray[2], 10);
        let quiztime = (hour * 60 * 60 + minute * 60 + second) * 1000;

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

  const handleRadioChange = (index, value) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = value;
    setSelectedValues(updatedValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestions();
    };

    fetchData();
  }, [selectedSubject]);

  useEffect(() => {
    selectedValuesRef.current = selectedValues;
  }, [selectedValues]);

  const startQuiz = async () => {
    try {
      const quiztime = await fetchTime();
      setTime(quiztime);
      setIsButtonVisible(false);
      setVisible(true);

      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalId);
            handleSubmit(selectedValuesRef.current);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      setTimerId(intervalId);
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  const getFormattedTime = (milliseconds) => {
    const totalFormattedSeconds = parseInt(Math.floor(milliseconds / 1000));
    const totalFormattedMinutes = parseInt(
      Math.floor(totalFormattedSeconds / 60)
    );
    const totalFormattedHours = parseInt(
      Math.floor(totalFormattedMinutes / 60)
    );
    const loopSeconds = parseInt(Math.floor(totalFormattedSeconds % 60));
    const loopMinutes = parseInt(Math.floor(totalFormattedMinutes % 60));
    const loopHours = parseInt(Math.floor(totalFormattedHours % 24));
    return `${loopHours}:${loopMinutes}:${loopSeconds}`;
  };

  const handleSubmit = async (selectedValue) => {
    try {
      const user_id = localStorage.getItem("userid");
      const apiUrl = "http://127.0.0.1:8000/api/submitresponse";
      const selectedVal = selectedValue;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject_id: selectedSubject,
          user_id: user_id,
          response_list: selectedVal,
        }),
      });

      const responseData = {
        status: response.status,
        statusText: response.statusText,
        data: await response.json(),
      };

      console.log("Response Data:", responseData);

      if (response.status === 200) {
        toastr.success(responseData.data.msg);
        setSubmitted(true);
        setAfterSubmit(true);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <>
      {isAfterSubmit && (
        <div>
          <p style={{ fontSize: "30px" }}>
            Your response has been submitted successfully.
          </p>
        </div>
      )}
      {!isAfterSubmit && isButtonVisible && (
        <p>
          You have {fulltime} to attempt all questions. Click on the button
          below to start the quiz <br />
          <Button onClick={startQuiz}>Start Quiz</Button>
        </p>
      )}
      {!isAfterSubmit && isVisible && (
        <div>
          <Grid container>
            <Grid item md={1.8}>
              <Sidebar user_id={user_id} />
            </Grid>
            <Grid item md={9}>
              <Container maxWidth="md">
                <p>
                  Total time remaining:
                  <p style={{ fontSize: "30px" }}>{getFormattedTime(time)}</p>
                </p>
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
                        onClick={() => handleSubmit(selectedValuesRef.current)}
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
