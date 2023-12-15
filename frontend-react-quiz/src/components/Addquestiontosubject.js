import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";

const Addquestiontosubject = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  if (uid && role == 1) {
  } else {
    window.location.href = "/login";
  }
  const { subject1_id } = useParams();

  const [newQuestion, setNewQuestion] = useState("");
  const [subject_id, setSubjectId] = useState(subject1_id);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addQuestion = () => {
    // alert(newQuestion)
    if (newQuestion.trim() !== "") {
      fetch("http://127.0.0.1:8000/api/addquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject_id: subject_id,
          question: newQuestion,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          correctOption: selectedOption,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // alert(data);
          setNewQuestion("");
          setOption1("");
          setOption2("");
          setOption3("");
          setOption4("");

        });
      // alert(response)
      toastr.succcess("Question added successfully");
      //   window.location.reload();
    } else {
      toastr.error("Please enter a valid question name.");
    }
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <TextField
          label="Question 1"
          variant="outlined"
          name="newquestion"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Option1"
          variant="outlined"
          name="option1"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Option2"
          variant="outlined"
          name="option2"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Option3"
          variant="outlined"
          name="option3"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Option4"
          variant="outlined"
          name="option4"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
        />
      </Grid>
      <Grid item>
        <FormControl variant="outlined">
          <InputLabel>Correct Option</InputLabel>
          <Select
            label="Correct Option"
            name="correctOption"
            onChange={handleOptionChange}
            value={selectedOption}
          >
            <MenuItem value="option1">Option1</MenuItem>
            <MenuItem value="option2">Option2</MenuItem>
            <MenuItem value="option3">Option3</MenuItem>
            <MenuItem value="option4">Option4</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={addQuestion}>
          Add Question
        </Button>
      </Grid>
    </Grid>
  );
};

export default Addquestiontosubject;
