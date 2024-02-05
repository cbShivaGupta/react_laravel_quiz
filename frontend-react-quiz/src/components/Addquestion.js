import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import config from '../config';
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
import Adminheader from "./Adminheader";

// import NumberInput from './NumberInput';

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
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  // if (uid && role === '1') {
  //   // Do something for admin
  // } else {
  //   window.location.href = '/login';
  // }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [quizhour, setQuizHour] = useState("");
  const [quizmin, setQuizMin] = useState("");
  const [quizsec, setQuizSec] = useState("");

  const [time, setTime] = useState("12:00"); // Set your initial time
  const [openSidebar, setOpenSidebar] = useState(true);

  const sidebarToggler = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    const resizeSidebar = () => {
      if (window.innerWidth <= 1200 && openSidebar) {
        setOpenSidebar(false);
      }
    };
    window.addEventListener("resize", resizeSidebar);
    return () => {
      window.removeEventListener("resize", resizeSidebar);
    };
  }, [openSidebar]);

  const apiUrl = config.backendUrl;


  const fetchSubjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/subjectforquiz`);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const setHour = (event) => {
    setQuizHour(event.target.value);
  };
  const setMin = (event) => {
    setQuizMin(event.target.value);
  };
  const setSec = (event) => {
    setQuizSec(event.target.value);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleStartQuiz = () => {
    console.log(`Starting quiz for subject ID: ${selectedSubject}`);
  };

  const addSubject = async () => {
    if (quizhour == "" || quizhour.length != 2) {
      toastr.error("Please enter hour in proper valid format");
      return;
    }
    if (quizmin == "" || quizmin.length != 2) {
      toastr.error("Please enter minutes in proper valid format");
      return;
    }
    if (quizsec == "" || quizsec.length != 2) {
      toastr.error("Please enter seconds in proper valid format");
      return;
    }
    if (quizhour == "00" && quizmin == "00" && quizsec == "00") {
      toastr.error("Total time cannot be 0");
      return;
    }

    if (newSubject.trim() !== "") {
      try {
        const response = await fetch(`${apiUrl}/addsubject`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            subject_name: newSubject,
            quizhour: quizhour,
            quizmin: quizmin,
            quizsec: quizsec,
          }),
        });

        const res = await response.json();
        response.status === 200
          ? toastr.success("Subject added")
          : toastr.error("Some error occurred");

        fetchSubjects();
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    } else {
      toastr.error("Please enter a valid subject name.");
    }
  };

  const deleteSubject = async () => {
    // alert(selectedSubject)
    if (!selectedSubject) {
      toastr.error("Please select a subject to delete");
      return;
    }
  if(window.confirm("Are you sure you want to delete this subject?")){
    try {
      const response = await fetch(`${apiUrl}/deletesubject`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
           // Add the subject ID to the headers
        },

        body: JSON.stringify({ 
          subject_id: selectedSubject
        })


      });
  
      if (response.status === 200) {
        toastr.success("Subject deleted");
        setSubjects((prevSubjects) =>
          prevSubjects.filter((subject) => subject.id !== selectedSubject)
        );
        setSelectedSubject("")
        // fetchSubjects();
      } else {
        toastr.error("Failed to delete subject");
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  }}
  
  return (




    <>
    <div className={`mainLayout ${openSidebar ? "openSidebar" : ""}`}>
      <aside className={`leftSidebar ${openSidebar ? "" : "close"}`}>
              <Adminsidebar />

      </aside>
      <div className="mainContent">
          <nav>
            <Adminheader />
          </nav>
          <main className="cst-main">

        <Container>
      <Grid container>
        
        <Grid item xs={9}>
          <div style={{ padding: "20px" }}>
            <h2>SUBJECT MANAGEMENT</h2>
          
           
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
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              // onClick={handleStartQuiz}
              disabled={!selectedSubject}
            >
              <Link
                to={`/editsubject/${selectedSubject}`}
                style={{ textDecoration: "none", color: "white" }}
              >
               Edit Subject
              </Link>
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
             
              disabled={!selectedSubject}
              onClick={deleteSubject}
            >
              {/* <Link
                to={`/editsubject/${selectedSubject}`}
                style={{ textDecoration: "none", color: "white" }}
              > */}
              Delete Subject
              {/* </Link> */}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
    </main>
      </div>
    </div>
  </>

    
  );
};

export default AddQuestion;

     



































   