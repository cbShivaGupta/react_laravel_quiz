import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import config from "../config";
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
import Usersidebar from "./Usersidebar";
import Userheader from "./Userheader";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Badge,
} from "react-bootstrap";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  // Container,
  Grid,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
// import Sidebar from "./Sidebar";

const MyRecords = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  if (!uid && role == 1) {
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

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recordDate, setRecordDate] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
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

  const fetchRecords = async (event) => {
    event.preventDefault();
    // alert(selectedSubject)
    if (recordDate == null) {
      if (selectedSubject == null) {
        toastr.error("Select date or subject");
      } else {
        // alert();
        // alert("userid="+user_id+" "+"subject_id="+selectedSubject)
        const response = await fetch(`${apiUrl}/fetchrecords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            selected_subject: selectedSubject,
            filter_id: 2,
          }),
        });

        const contentType = response.headers.get("content-type");
        

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("DATA="+data);
          setIsVisible(true);
          setRecords(data);
        } else {
          const text = await response.text();
          console.error("Invalid JSON response. Response body:", text);
        }

        setLoading(false);
      }
    } else {
      if (selectedSubject == null) {
        const response = await fetch(`${apiUrl}/fetchrecords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            record_date: recordDate,
            filter_id: 1,
          }),
        });

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setIsVisible(true);
          setRecords(data);
        } else {
          const text = await response.text();
          console.error("Invalid JSON response. Response body:", text);
        }

        setLoading(false);
      } else {
        const response = await fetch(`${apiUrl}/fetchrecords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            record_date: recordDate,
            selected_subject: selectedSubject,
            filter_id: 3,
          }),
        });

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setIsVisible(true);
          setRecords(data);
        } else {
          const text = await response.text();
          console.error("Invalid JSON response. Response body:", text);
        }

        setLoading(false);
      }
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

    setRecordDate(formattedDate);
  };
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <>
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
                  <div className="quizFilter">
                    <Card>
                      <CardBody>
                        <div className="card-head">Filter Quiz</div>
                        <Form>
                          <Row className="mb-3">
                            <Form.Group as={Col} lg="5" controlId="enterDate">
                              <Form.Label>Select Date</Form.Label>
                              <Form.Control
                                // required
                                type="date"
                                selected={recordDate}
                                onChange={(event) => handleDateChange(event)}
                                // {handleDateChange}
                                // dateFormat="yyyy-MM-dd"
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              lg="5"
                              controlId="selectCourse"
                            >
                              <Form.Label>Select Subject</Form.Label>
                              <Form.Select id="subject-select"
                      // value={selectedSubject}
                      onChange={handleSubjectChange}>
                                {/* <option disabled>select subject</option> */}

                           
                        {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
                                ))}
                                {/* <option value="math">Maths</option> */}
                              </Form.Select>
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Col lg={2} className="mt-auto">
                              <button onClick={(event) => fetchRecords(event)} className="myBtn cardBtn w-100">
                                <i class="font-12 fa-solid fa-magnifying-glass me-1"></i>
                                Search
                              </button>
                            </Col>
                          </Row>
                        </Form>
                        <Row>
                          {isVisible  && (
                            <TableContainer>
                              <Table className="cstTable">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      <b>Attempt date</b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Subject Name</b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Question</b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Options</b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Selected Response</b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Correct Response</b>
                                    </TableCell>
                                    <TableCell>
                                      <b>Answer Status</b>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {records.map((item, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{item.date}</TableCell>
                                      <TableCell>{item.subject_name}</TableCell>
                                      <TableCell>{item.question}</TableCell>
                                      <TableCell>
                                        1.{item.option1}
                                        <br />
                                        2.{item.option2}
                                        <br />
                                        3.{item.option3}
                                        <br />
                                        4.{item.option4}
                                        <br />
                                      </TableCell>
                                      <TableCell>{item.response}</TableCell>
                                      <TableCell>
                                        {item.correct_option}
                                      </TableCell>
                                      <TableCell>
                                        {item.correct_option ===
                                        item.response ? (
                                          <span style={{ color: "green" }}>
                                            <Badge  bg="success">
                                              correct
                                            </Badge>
                                          </span>
                                        ) : (
                                          <span style={{ color: "red" }}>
                                            <Badge  bg="danger">
                                              Incorrect
                                            </Badge>
                                          </span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}
                        </Row>
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
export default MyRecords;