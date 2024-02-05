import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { Container, Row, Col, Card, CardBody, Form } from "react-bootstrap";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useNavigate } from "react-router-dom";
import config from "../config";
import Usersidebar from "./Usersidebar";
import Userheader from "./Userheader";
import Modal from 'react-modal';


const AttemptQuiz = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (!(uid && role == 2)) {
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

  const user_id = localStorage.getItem("userid");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = config.backendUrl;

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/subjectforquiz`);
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const checkPreviousAttemptStatus = async () => {
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

      if (response.status === 202) {
        toastr.error(data.msg);
      } else {
        const route = `/quiz/${selectedSubject}`;
        navigate(route);
      }
    }
  };
  const handleSubjectChange = (event,id) => {
    event.preventDefault();
    // alert(id)
    setSelectedSubject(id);
    setIsModalOpen(true);

    

    // alert(selectedSubject)
   

    // checkPreviousAttemptStatus();
  };

  const startQuiz=(id)=>{
    // setIsModalOpen(false);
    const route = `/quiz/`+id;
    navigate(route);
  }
  const closeModal=()=>{
    setIsModalOpen(false);
  }

  const handleStartQuiz = () => {
    console.log(`Starting quiz for subject ID: ${selectedSubject}`);
  };
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%', // Adjust the width as needed
      maxHeight: '70%', // Adjust the maxHeight as needed
      overflow: 'auto',
    },
  };
  return (
    <>

<Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    style={modalStyles}
    contentLabel="Quiz Modal"
  >
    <p>
      This quiz has alloted time within which you have to attempt it.The timer along with quiz will start when you click on button below.
      Click on the button below to start the quiz.
    </p>
    <Button onClick={()=>startQuiz(selectedSubject)}>Start Quiz</Button>
 
  </Modal>
      <div className={`mainLayout ${openSidebar ? "openSidebar" : ""}`}>
        <aside className={`leftSidebar ${openSidebar ? "" : "close"}`}>
          <Usersidebar />
        </aside>
        <div className="mainContent">
          <nav>
            <Userheader />
          </nav>
          <main className="cst-main">
            <Container fluid>
              <Row>
                <Col lg="12">
                  <div className="quizAttempt">
                    <Card>
                      <CardBody>
                        <div className="card-head">Attempt Quiz</div>
                        <Form>
                          <Col className="boxes d-flex flex-wrap">
                            {subjects.map((subject) => (
                              <div className="main-box" key={subject.id}>
                                <div className="box-icon">
                                  <i className="fa-regular fa-folder-open"></i>
                                  <span>{subject.subject_name}</span>
                                </div>
                                <div className="box-btn pt-3 border-top">
                                  <button
                                    onClick={(event) =>
                                      handleSubjectChange(event,subject.id)
                                    }
                                    className="myBtn cardBtn"
                                  >
                                    <i className="fa-solid fa-check me-1" />{" "}
                                    Select Quiz
                                  </button>
                                </div>
                              </div>
                            ))}
                          </Col>
                        </Form>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Container>
          </main>
        </div>
      </div>
    </>
  );
};

export default AttemptQuiz;
