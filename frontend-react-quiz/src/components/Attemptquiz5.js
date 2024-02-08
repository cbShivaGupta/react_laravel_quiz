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
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useNavigate  } from 'react-router-dom';
import config from '../config';
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
import Usersidebar from "./Usersidebar";
import Userheader from "./Userheader";






const AttemptQuiz = () => {


  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();


  if (uid && role == 2) {
  } else {
    window.location.href = "/login";
  }


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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user_id = localStorage.getItem("userid");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const apiUrl = config.backendUrl;


  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/subjectforquiz`
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
  const checkpreviousattempstatus=async()=>{
    // alert(user_id)
    // alert(selectedSubject)
    const response = await fetch(`${apiUrl}/checkpreviousattempstatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        selected_subject: selectedSubject,
       
      }),
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
    // alert(data.msg)
    // alert(response.status)
    if(response.status==202)
    {
      // alert(response.status)
      toastr.error(data.msg)
    }
    else{
      // alert('in else')
      const route = `/quiz/${selectedSubject}`;
      // const history = useHistory();


      // Use the history object to navigate to the route
      navigate(route);
    }
    }
  }

  const handleStartQuiz = () => {
    // Perform any actions needed before starting the quiz
    console.log(`Starting quiz for subject ID: ${selectedSubject}`);
  };

  return (


    <>
    <div className={`mainLayout ${openSidebar ? "openSidebar" : ""}`}>
      <aside className={`leftSidebar ${openSidebar ? "" : "close"}`}>
       
        <Usersidebar />

      </aside>
      <div className="mainContent">
        <nav>
        <Userheader/>
        </nav>
        <main>
      
     
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
          // onClick={handleStartQuiz}
          disabled={!selectedSubject}
          onClick={checkpreviousattempstatus}
        >
          {/* Use Link outside of the Button component */}
          {/* <Link
            to={`/quiz/${selectedSubject}`}
            style={{ textDecoration: "none", color: "white" }}
          > */}
            Start Quiz
          {/* </Link> */}
        </Button>
      </Box>
   


        </main>
      </div>
    </div>
  </>

    
  );
};

export default AttemptQuiz;