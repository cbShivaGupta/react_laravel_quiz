import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import Usersidebar from "./Usersidebar";
import Userheader from "./Userheader";
// import { Doughnut } from 'react-chartjs-2';


import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  ListGroup,
} from "react-bootstrap";

const UserDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const dummtData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'], // Labels for each segment
    datasets: [
      {
        label: 'My Doughnut Chart', // Overall chart label
        data: [300, 50, 100, 200], // Values for each segment
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Red
          'rgba(54, 162, 235, 0.8)', // Blue
          'rgba(255, 206, 86, 0.8)', // Yellow
          'rgba(75, 192, 192, 0.8)', // Green
        ],
        hoverOffset: 4, // Adjust hover effect offset
      },
    ],
  };

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
  const uid = localStorage.getItem("user_token");
  if (uid) {
  } else {
    window.location.href = "/login";
  }
  const { user_id } = useParams();

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
                        <p>Courses</p>
                        <span>200+ courses</span>
                      </Link>
                  </Card>
                </Col>

                <Col lg="3">
                  <Card>
                    <Link className="mainBox blue">
                      <i class="fa-solid fa-rocket"></i>
                      <p>Digital Market</p>
                      <span>200+ courses</span>
                    </Link>
                  </Card>
                </Col>

                <Col lg="3">
                  <Card>
                  <Link className="mainBox yellow">
                      <i class="fa-solid fa-chart-pie"></i>
                      <p>Web development</p>
                      <span>200+ courses</span>
                    </Link>
                  </Card>
                </Col>

                <Col lg="3">
                  <Card>
                  <Link className="mainBox green">
                      <i class="fa-solid fa-chart-simple"></i>
                      <p>Full overview</p>
                      <span>200+ courses</span>
                    </Link>
                  </Card>
                </Col>
              </Row>
              {/* <Row>
                <Col lg="12">
                  <Card>
                    <Doughnut data={dummtData} />
                  </Card>
                </Col>
              </Row> */}
            </Container>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
