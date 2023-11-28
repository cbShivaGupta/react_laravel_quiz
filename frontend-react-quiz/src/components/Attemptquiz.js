import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const AttemptQuiz = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  if (uid && role == 2) {
  } else {
    window.location.href = "/login";
  }
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user_id = localStorage.getItem("userid");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/subjectforquiz"
        );
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleStartQuiz = () => {
    // Perform any actions needed before starting the quiz
    console.log(`Starting quiz for subject ID: ${selectedSubject}`);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar user_id={user_id} />
      <Box p={3} flexGrow={1}>
        <FormControl fullWidth>
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
            {/* Render questions and answers here */}
            {questions.map((question) => (
              <div key={question.question_id}>
                <p>{question.question}</p>
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
          {/* Use Link outside of the Button component */}
          <Link
            to={`/quiz/${selectedSubject}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            Start Quiz
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default AttemptQuiz;
