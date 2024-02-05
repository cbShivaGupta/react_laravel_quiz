import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import Usersidebar from "./Usersidebar";
import Userheader from "./Userheader";
import Chart from "./Chart";
import config from '../config';
import { Container, Row, Col, Card } from "react-bootstrap";

const UserDashboard = () => {
  const apiUrl = config.backendUrl;
  const [openSidebar, setOpenSidebar] = useState(true);
  const [totalsubjects, setTotalsubjects] = useState();

  const [totalquestions, setTotalquestions] = useState();
  const [totalcorrect, setTotalcorrect] = useState();


  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchUserPerformance = async () => {
      try {
        const response = await fetch(`${apiUrl}/fetchuserperformance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),                                                                                     
        });

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log(data);
          setTotalsubjects( data.total_subjects)
          setTotalquestions(data.total_questions)
          setTotalcorrect(data.total_correct)

          // console.log("Total Questions:", data.total_questions);
          // console.log("Total Subjects:", data.total_subjects);
        }
      } catch (error) {
        console.error("Error fetching user performance:", error);
      }
    };

    // Fetch user performance when the component mounts
    fetchUserPerformance();
  }, [apiUrl, userId]);

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

  const uid = localStorage.getItem("user_token");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!uid) {
      window.location.href = "/login";
    }
  }, [uid]);

  const { user_id } = useParams();

  // alert(user_id)
// alert(userid);
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
            <Container fluid className="dashboardBoxes">
              <Row>
                <Col lg="3">
                  <Card>
                      <Link className="mainBox purple">
                        <i class="fa-solid fa-flag-checkered"></i>
                        <p>Total Subjects Attempted</p>
                        <span>{totalsubjects}</span>
                      </Link>
                  </Card>
                </Col>

                <Col lg="3">
                  <Card>
                    <Link className="mainBox blue">
                      <i class="fa-solid fa-rocket"></i>
                      <p>Total Questions Attempted</p>
                      <span>{totalquestions}</span>
                    </Link>
                  </Card>
                </Col>

                <Col lg="3">
                  <Card>
                  <Link className="mainBox yellow">
                      <i class="fa-solid fa-chart-pie"></i>
                      <p>Total Correct Responses</p>
                      <span>{totalcorrect}</span>
                    </Link>
                  </Card>
                </Col>

                <Col lg="3">
                  <Card>
                  <Link className="mainBox green">
                      <i class="fa-solid fa-chart-simple"></i>
                      <p>Full overview</p>
                      <span><b>{((totalcorrect / totalquestions) * 100).toFixed(2)}%</b> <b>Successfull attempts</b></span>
                    </Link>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Card>
                    <Chart/>
                  </Card>
                </Col>
              </Row> 
            </Container>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
