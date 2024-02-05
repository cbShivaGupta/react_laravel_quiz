import React, { useState, useEffect } from "react";
import config from '../config';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { useParams } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../App.css";
import Adminsidebar from "./Adminsidebar";  // Adjusted the component name for consistency
import Adminheader from "./Adminheader";  // Adjusted the component name for consistency

const EditSubject = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");
  const apiUrl = config.backendUrl;

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!(uid && role === "1")) {
      window.location.href = "/login";
    }
  }, [uid, role]);

  const { subject1_id } = useParams();
  const [subject, setSubject] = useState([]);
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
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

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/geteditsubjectdetails`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              subject_id: subject1_id,
            }),
          }
        );
        const res = await response.json();

        console.log(res);
        setSubject(res);
        const fetchedtime = res[0].quiz_time;
        let timeArray = fetchedtime.split(":");
        let [hour, minute, second] = timeArray.map((time) => parseInt(time, 10));

        // Ensure the leading zeros for hours, minutes, and seconds
        hour = hour < 10 ? `0${hour}` : hour;
        minute = minute < 10 ? `0${minute}` : minute;
        second = second < 10 ? `0${second}` : second;

        setHour(hour);
        setMin(minute);
        setSec(second);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [apiUrl, subject1_id]);

  const handleInputChange = (index, name, value) => {
    setSubject((prevSubject) => {
      const updatedSubject = [...prevSubject];
      updatedSubject[index][name] = value;
      return updatedSubject;
    });
  };

  const handleUpdate = async (question) => {
    try {
      const response = await fetch(
        `${apiUrl}/updateSubject`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            subject_id: subject1_id,
            question_id: question.question_id,
            answer_id: question.id,
            question: question.question,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            correct_option: question.correct_option,
          }),
        }
      );

      const result = await response.json();
      if (response.status === 202) {
        toastr.success(result.msg);
      }
      if (response.status === 404) {
        toastr.error(result.msg);
      }
      console.log(result);

      // You may want to update the local state or perform any additional actions
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleQuizhour = (event) => {
    setHour(event.target.value);
  };
  const handleQuizmin = (event) => {
    setMin(event.target.value);
  };
  const handleQuizsec = (event) => {
    setSec(event.target.value);
  };

  const updateTime = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/updatesubjecttime`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            subject_id: subject1_id,
            hour: hour,
            minute: min,
            second: sec,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (response.status === 200) {
        toastr.success(result.message);
        // fetchSubjects();
      }
    } catch (error) {
      console.error("Error updating time:", error);
      // Handle the error as needed
    }
  };

  const handleDelete = async (question) => {
    try {
      const response = await fetch(
        `${apiUrl}/deleteQuestion`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            // subject_id: subject1_id,
            question_id: question.question_id,
            answer_id: question.id,
          }),
        }
      );

      const result = await response.json();
      if (response.status === 202) {
        toastr.success(result.msg);
        // fetchSubjects();
      }
      if (response.status === 404) {
        toastr.error(result.msg);
      }
      // console.log(result);

      // You may want to update the local state or perform any additional actions
    } catch (error) {
      console.error("Error updating data:", error);
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
            <form>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Option1</TableCell>
                    <TableCell>Option2</TableCell>
                    <TableCell>Option3</TableCell>
                    <TableCell>Option4</TableCell>
                    <TableCell>Correct Option</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subject.map((question, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <input
                          type="hidden"
                          name="question_id"
                          value={question.question_id}
                        />
                        <TextField
                          type="text"
                          style={{ width: "450px" }}
                          value={question.question}
                          onChange={(e) =>
                            handleInputChange(index, "question", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={question.option1}
                          onChange={(e) =>
                            handleInputChange(index, "option1", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={question.option2}
                          onChange={(e) =>
                            handleInputChange(index, "option2", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={question.option3}
                          onChange={(e) =>
                            handleInputChange(index, "option3", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={question.option4}
                          onChange={(e) =>
                            handleInputChange(index, "option4", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <InputLabel>Correct Option</InputLabel>
                          <Select
                            style={{ height: "30px" }}
                            value={question.correct_option}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "correct_option",
                                e.target.value
                              )
                            }
                          >
                            <MenuItem value="option1">Option 1</MenuItem>
                            <MenuItem value="option2">Option 2</MenuItem>
                            <MenuItem value="option3">Option 3</MenuItem>
                            <MenuItem value="option4">Option 4</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleUpdate(question)}>
                          Update
                        </Button>
                        <Button onClick={() => handleDelete(question)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </form>
            <br />
            <div>
              <center>
                <b>QUIZ TIME</b>
              </center>
              <br />
              <center>
                Hr
                <Input
                  type="number"
                  name="quizhour"
                  maxLength={2}
                  onChange={handleQuizhour}
                  value={hour}
                />
                Min
                <Input
                  type="number"
                  name="quizmin"
                  maxLength={2}
                  onChange={handleQuizmin}
                  value={min}
                />
                Sec
                <Input
                  type="number"
                  name="quizsec"
                  maxLength={2}
                  onChange={handleQuizsec}
                  value={sec}
                />
                <Button onClick={updateTime}>Update</Button>
              </center>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EditSubject;
