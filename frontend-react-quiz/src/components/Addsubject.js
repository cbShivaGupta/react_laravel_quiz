import React, { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

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

const AddSubject = () => {
  const [newSubject, setNewSubject] = useState("");
  const [quizhour, setQuizHour] = useState("00");
  const [quizmin, setQuizMin] = useState("00");
  const [quizsec, setQuizSec] = useState("00");

  const addSubject = async () => {
    if (newSubject.trim() !== "") {
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

   
      try {
        const response = await fetch("http://127.0.0.1:8000/api/addsubject", {
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

        // fetchSubjects();
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    } else {
      toastr.error("Please enter a valid subject name.");
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={6} md={3}>
          <Adminsidebar />
        </Grid>
        <Grid item xs={6} md={9}>
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
            <Typography variant="h5">Quiz Duration:</Typography>
            HR:{" "}
            <input
              type="number"
              name="quizhour"
              max={2}
              value={quizhour}
              onChange={(e) => setQuizHour(e.target.value)}
            />
            MIN:{" "}
            <input
              type="number"
              name="quizmin"
              max={2}
              value={quizmin}
              onChange={(e) => setQuizMin(e.target.value)}
            />
            SEC:{" "}
            <input
              type="number"
              name="quizsec"
              max={2}
              value={quizsec}
              onChange={(e) => setQuizSec(e.target.value)}
            />
            <br /> <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={addSubject}
              style={{ marginRight: "10px" }}
            >
              Add Subject
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddSubject;
