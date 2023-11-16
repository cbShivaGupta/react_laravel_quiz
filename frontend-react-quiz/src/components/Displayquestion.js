import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from './Sidebar'; 
import Footer from './Footer'; 


import {
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";

const DisplayQuestion = () => {
  const { selectedSubject, user_id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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

    fetchQuestions();
  }, [selectedSubject]);

  const handleRadioChange = (index, value) => {
    setSelectedValues((prevSelectedValues) => {
      const updatedValues = [...prevSelectedValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  const handleSubmit = async () => {
    console.log("Submitted values:", selectedValues);
    setSubmitted(true);

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
    alert(data2.msg);
  };

  return (
    <Grid container>
      <Grid item xs={1.8}>
        <Sidebar user_id={user_id} />
      </Grid>
      <Grid item xs={9}>
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            {loading && <CircularProgress />}
            {error && <Typography variant="h6">Error: {error.message}</Typography>}

            {questions.length === 0 && !loading && (
              <Typography variant="h6">
                No questions found for the selected subject.
              </Typography>
            )}

            {questions.length > 0 && (
              <div>
                {questions.map((question, index) => (
                  <div key={question.question_id} style={{ marginBottom: "20px" }}>
                    <Typography variant="h6">
                      Q{index + 1}: {question.question}
                    </Typography>
                    <RadioGroup
                      value={selectedValues[index]}
                      onChange={(event) => handleRadioChange(index, event.target.value)}
                    >
                      <FormControlLabel
                        value={`option1_${index + 1}_${question.question_id}`}
                        control={<Radio />}
                        label={`A: ${question.option1}`}
                      />
                      <FormControlLabel
                        value={`option2_${index + 1}_${question.question_id}`}
                        control={<Radio />}
                        label={`B: ${question.option2}`}
                      />
                      <FormControlLabel
                        value={`option3_${index + 1}_${question.question_id}`}
                        control={<Radio />}
                        label={`C: ${question.option3}`}
                      />
                      <FormControlLabel
                        value={`option4_${index + 1}_${question.question_id}`}
                        control={<Radio />}
                        label={`D: ${question.option4}`}
                      />
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
                  <Typography variant="h6">Answers submitted successfully!</Typography>
                )}
              </div>
            )}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default DisplayQuestion;
