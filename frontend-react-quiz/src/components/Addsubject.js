import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import config from '../config';
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";


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

const Addsubject = () => {
  const [newSubject, setNewSubject] = useState("");
  const [quizhour, setQuizHour] = useState("00");
  const [quizmin, setQuizMin] = useState("00");
  const [quizsec, setQuizSec] = useState("00");
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

  const addSubject = async () => {
    if (newSubject.trim() !== "") {
      if (quizhour === "" || quizhour.length !== 2) {
        toastr.error("Please enter hours in a valid format");
        return;
      }
      if (quizmin === "" || quizmin.length !== 2) {
        toastr.error("Please enter minutes in a valid format");
        return;
      }
      if (quizsec === "" || quizsec.length !== 2) {
        toastr.error("Please enter seconds in a valid format");
        return;
      }
      if (quizhour === "00" && quizmin === "00" && quizsec === "00") {
        toastr.error("Total time cannot be 0");
        return;
      }

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
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    } else {
      toastr.error("Please enter a valid subject name.");
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
            <Container>
              <Grid container>
                <Grid item xs={12} md={9}>
                  <div style={{ padding: "20px" }}>
                    <Typography variant="h5">
                      Add a new subject:
                    </Typography>
                    <TextField
                      type="text"
                      name="newsubject"
                      label="New Subject Name"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                    />
                    <Typography variant="h5">Quiz Duration:</Typography>
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-2">
                        HR:
                        <input
                          type="number"
                          name="quizhour"
                          max={2}
                          className="form-control"
                          value={quizhour}
                          onChange={(e) => setQuizHour(e.target.value)}
                        />
                      </div>
                      <div className="me-2">
                        MIN:
                        <input
                          type="number"
                          name="quizmin"
                          max={2}
                          className="form-control"
                          value={quizmin}
                          onChange={(e) => setQuizMin(e.target.value)}
                        />
                      </div>
                      <div>
                        SEC:
                        <input
                          type="number"
                          name="quizsec"
                          max={2}
                          className="form-control"
                          value={quizsec}
                          onChange={(e) => setQuizSec(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addSubject}
                      className="me-2"
                    >
                      Add Subject
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

export default Addsubject;
