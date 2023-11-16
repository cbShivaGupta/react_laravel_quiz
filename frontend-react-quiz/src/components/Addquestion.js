// AddQuestion.js
import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";

const AddQuestion = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/subjectforquiz");
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleStartQuiz = () => {
    console.log(`Starting quiz for subject ID: ${selectedSubject}`);
  };

  const addSubject = () => {
    if (newSubject.trim() !== '') {
      // Logic for adding subject
    } else {
      alert('Please enter a valid subject name.');
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={3}>
          <Adminsidebar />
        </Grid>
        <Grid item xs={9}>
          <div style={{ padding: "20px" }}>
            <Typography variant="h5">Add a new subject:</Typography>
            <TextField
              type="text"
              name="newsubject"
              label="New Subject"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={addSubject} style={{ marginRight: "10px" }}>
              Add Subject
            </Button>
            <Typography variant="body2">OR</Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="subject-select">Select Subject</InputLabel>
              <Select
                label="Select Subject"
                id="subject-select"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.subject_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {questions.length > 0 && (
              <div>
                {questions.map((question) => (
                  <div key={question.question_id}>
                    <Typography>{question.question}</Typography>
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleStartQuiz}
              disabled={!selectedSubject}
            >
              <Link
                to={`/addquestiontosubject/${selectedSubject}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                Add Question
              </Link>
            </Button>
          </div>
          </Grid>
      </Grid>
    </Container>
  );
};

export default AddQuestion;
     
