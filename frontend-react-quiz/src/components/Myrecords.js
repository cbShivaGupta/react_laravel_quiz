import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Sidebar from "./Sidebar";

const MyRecords = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  if (!uid && role == 1) {
    window.location.href = "/login";
  }

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

  const fetchRecords = async () => {
    if (recordDate == null) {
      if (selectedSubject == null) {
        toastr.error("Select date or subject");
      } else {
        const response = await fetch("http://127.0.0.1:8000/api/fetchrecords", {
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
        const response = await fetch("http://127.0.0.1:8000/api/fetchrecords", {
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
        const response = await fetch("http://127.0.0.1:8000/api/fetchrecords", {
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

  const handleDateChange = (date) => {
    const formattedDate = new Date(date.toISOString().slice(0, 10));
    // alert(correct_date); return;
    setRecordDate(formattedDate);
  };
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <Grid container>
      <Grid item md={2}>
        <Sidebar user_id={user_id} />
      </Grid>
      <Grid item md={10}>
        <Container maxWidth="lg">
          <Typography variant="h5">Select Date</Typography>
          <DatePicker
            selected={recordDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
          />

          <Typography variant="h5">Select Subject</Typography>

          <FormControl fullWidth style={{ maxWidth: "300px" }}>
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
          <Button variant="contained" color="primary" onClick={fetchRecords}>
            Search
          </Button>

          {isVisible && (
            <>
              <Typography
                variant="h4"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                My Records
              </Typography>

              {loading && <CircularProgress style={{ margin: "20px" }} />}
              {error && (
                <Typography variant="body1" color="error">
                  Error: {error.message}
                </Typography>
              )}

              {records.length === 0 && !loading && (
                <Typography variant="body1">No records found.</Typography>
              )}

              {records.length > 0 && (
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Response ID</b>
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
                          <TableCell>{item.response_id}</TableCell>
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
                          <TableCell>{item.correct_option}</TableCell>
                          <TableCell>
                            {item.correct_option === item.response ? (
                              <span style={{ color: "green" }}>
                                <b>Correct</b>
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>
                                <b>Incorrect</b>
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default MyRecords;
