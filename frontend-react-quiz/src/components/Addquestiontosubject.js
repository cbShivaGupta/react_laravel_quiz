import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import config from '../config';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";


const Addquestiontosubject = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  if (uid && role === "1") {
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
  const apiUrl = config.backendUrl;
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      fetch(`${apiUrl}/addquestion`, {
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
          setNewQuestion("");
          setOption1("");
          setOption2("");
          setOption3("");
          setOption4("");
        });

      toastr.success("Question added successfully");
    } else {
      toastr.error("Please enter a valid question name.");
    }
  };

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

          <Container fluid>
            <Row>
              <Col md={12}>
                <h1>Add Question to Subject</h1>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Question </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Option1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option1"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  />
                </Form.Group>
              </Col></Row><Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Option2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option2"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Option3</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option3"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                  />
                </Form.Group>
              </Col></Row><Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Option4</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter option4"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Correct Option</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedOption}
                    onChange={handleOptionChange}
                  >
                    <option value="option1">Option1</option>
                    <option value="option2">Option2</option>
                    <option value="option3">Option3</option>
                    <option value="option4">Option4</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>  <Col md={12}></Col></Row>
            <br/>
            <Row>
            <Col md={4}></Col>
              <Col md={4}>
                <Button variant="primary" onClick={addQuestion}>
                  Save Question
                </Button>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Container>
        </main>
      </div>
      </div>
    </>
  );
};

export default Addquestiontosubject;
