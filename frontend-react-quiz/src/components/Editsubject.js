import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Editsubject = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");

  if (uid && role == 1) {
  } else {
    window.location.href = "/login";
  }

  const { subject1_id } = useParams();
  const [subject, setSubject] = useState([]);
  const [updateQuestions, setUpdateQuestions] = useState([]);

  const fetchSubjects = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/geteditsubjectdetails",
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

    // Set initial values based on the data from the API
    setUpdateQuestions(res.map((item) => ({ ...item })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleInputChange = (index, name, value) => {
    setUpdateQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index][name] = value;
      return updatedQuestions;
    });
  };

  const handleUpdate = async (question) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/updateSubject", {
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
      });

      const result = await response.json();
      if(response.status==202){
        toastr.success(result.msg)
      }
      if(response.status==404){
        toastr.error(result.msg)
      }
      console.log(result);

      // You may want to update the local state or perform any additional actions
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (question) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/deleteQuestion", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
            // subject_id: subject1_id,
          question_id: question.question_id,
          answer_id: question.id,
          // question: question.question,
          // option1: question.option1,
          // option2: question.option2,
          // option3: question.option3,
          // option4: question.option4,
          // correct_option: question.correct_option,
        }),
      });

      const result = await response.json();
      if(response.status==202){
        toastr.success(result.msg)
        fetchSubjects()
      }
      if(response.status==404){
        toastr.error(result.msg)
      }
      console.log(result);

      // You may want to update the local state or perform any additional actions
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  return (
    <>
      <form>
        <table style={{ border: "1px solid #000", // 1px solid black border
     // Collapse borders into a single border
    }}>
          <thead>
            <tr>
              <th>Question</th>
              <th>Option1</th>
              <th>Option2</th>
              <th>Option3</th>
              <th>Option4</th>
              <th>Correct Option</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {updateQuestions.map((question, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="hidden"
                    name="question_id"
                    value={question.question_id}
                  />
                  <input
                    type="text"
                    style={{ width: "450px" }}
                    value={question.question}
                    onChange={(e) =>
                      handleInputChange(index, "question", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={question.option1}
                    onChange={(e) =>
                      handleInputChange(index, "option1", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={question.option2}
                    onChange={(e) =>
                      handleInputChange(index, "option2", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={question.option3}
                    onChange={(e) =>
                      handleInputChange(index, "option3", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={question.option4}
                    onChange={(e) =>
                      handleInputChange(index, "option4", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Select style={{height:"30px"}}
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
                </td>
                <td>
                  <Button onClick={() => handleUpdate(question)}>Update</Button>
                  <Button onClick={() => handleDelete(question)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </>
  );
};

export default Editsubject;
