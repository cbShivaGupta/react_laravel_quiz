import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
} from "@mui/material";
import Sidebar from "./Sidebar";

const MyRecords = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user_id = queryParams.get("user_id");

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/fetchrecords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setRecords(data);
        } else {
          const text = await response.text();
          console.error("Invalid JSON response. Response body:", text);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
        setError(error);
      }
    };

    fetchRecords();
  }, [user_id]);

  return (
    <Grid container>
      <Grid item xs={1.8}>
        <Sidebar user_id={user_id} />
      </Grid>
      <Grid item xs={9}>
        <Container maxWidth="md">
          {loading && <CircularProgress style={{ margin: "20px" }} />}
          {error && <p>Error: {error.message}</p>}

          {records.length === 0 && !loading && <p>No record found.</p>}

          {records.length > 0 && (
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Response ID</b></TableCell>
                    <TableCell><b>Subject Name</b></TableCell>
                    <TableCell><b>Question</b></TableCell>
                    <TableCell><b>Option1</b></TableCell>
                    <TableCell><b>Option2</b></TableCell>
                    <TableCell><b>Option3</b></TableCell>
                    <TableCell><b>Option4</b></TableCell>
                    <TableCell><b>Selected Response</b></TableCell>
                    <TableCell><b>Correct Response</b></TableCell>
                    <TableCell><b>Answer Status</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.response_id}</TableCell>
                      <TableCell>{item.subject_name}</TableCell>
                      <TableCell>{item.question}</TableCell>
                      <TableCell>{item.option1}</TableCell>
                      <TableCell>{item.option2}</TableCell>
                      <TableCell>{item.option3}</TableCell>
                      <TableCell>{item.option4}</TableCell>
                      <TableCell>{item.response}</TableCell>
                      <TableCell>{item.correct_option}</TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {item.correct_option === item.response ? (
                          <span style={{ color: "green" }}>
                            <b> Correct</b>{" "}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            <b> Incorrect</b>
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default MyRecords;
