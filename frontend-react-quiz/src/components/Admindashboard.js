

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import Usersidebar from "./Usersidebar";
import Adminheader from "./Adminheader";
import Adminchart from "./Adminchart";
import Adminchart2 from "./Adminchart2";

import config from '../config';
import { Container, Row, Col, Card } from "react-bootstrap";
import Adminsidebar from "./Adminsidebar";
import "../App.css";



const Admindashboard = () => {
  const apiUrl = config.backendUrl;
  const [openSidebar, setOpenSidebar] = useState(true);
  const [totalsubjects, setTotalsubjects] = useState();

  const [totalusers, setTotalusers] = useState();
  const [totalsubscribers, setTotalsubscribers] = useState();


  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetcallrecords = async () => {
      try {
        const response = await fetch(`${apiUrl}/fetcallrecords`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   user_id: userId,
          // }),                                                                                     
        });

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log(data);
          setTotalusers( data.total_users)
          setTotalsubscribers(data.total_subscribers)
          setTotalsubjects(data.total_subjects)

          // console.log("Total Questions:", data.total_questions);
          // console.log("Total Subjects:", data.total_subjects);
        }
      } catch (error) {
        console.error("Error fetching user performance:", error);
      }
    };

    // Fetch user performance when the component mounts
    fetcallrecords();
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
          <Adminsidebar />
        </aside>
        <div className="mainContent">
          <nav>
            <Adminheader />
          </nav>
          <main className="cst-main">
            <Container fluid className="dashboardBoxes">
              <Row>
                <Col lg="4">
                  <Card>
                      <Link className="mainBox purple">
                        <i class="fa-solid fa-flag-checkered"></i>
                        <p>Total Registered Users</p>
                        <span>{totalusers}</span>
                      </Link>
                  </Card>
                </Col>

                <Col lg="4">
                  <Card>
                    <Link className="mainBox blue">
                      <i class="fa-solid fa-rocket"></i>
                      <p>Total Subscribers</p>
                      <span>{totalsubscribers}</span>
                    </Link>
                  </Card>
                </Col>

                <Col lg="4">
                  <Card>
                  <Link className="mainBox yellow">
                      <i class="fa-solid fa-chart-pie"></i>
                      <p>Total Subjects</p>
                      <span>{totalsubjects}</span>
                    </Link>
                  </Card>
                </Col>

                {/* <Col lg="3">
                  <Card>
                  <Link className="mainBox green">
                      <i class="fa-solid fa-chart-simple"></i>
                      <p>Full overview</p>
                      <span><b>{((totalcorrect / totalquestions) * 100).toFixed(2)}%</b> <b>Successfull attempts</b></span>
                    </Link>
                  </Card>
                </Col> */}
              </Row>
              <Row>
                <Col lg="6">
                  <Card>
                    <Adminchart/>
                  </Card>
                </Col>
                <Col lg="6">
                  <Card style={{height:"500px",paddingTop:"30px;"}}>
                    <Adminchart2 style={{paddingTop:"30px"}}/>
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



export default Admindashboard;
