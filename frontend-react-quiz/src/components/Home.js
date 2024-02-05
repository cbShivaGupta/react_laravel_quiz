import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EntryHeader from "./Entryheader";
// import Footer from "./Footer";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MenuItem } from "@mui/material/MenuItem";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Home = () => {
  const [searchsubject, setSearchsubject] = useState("");
  const [totalusers, setTotalUsers] = useState("");
  const [totalsubjects, setTotalSubjects] = useState("");
  const [totalquestions, setTotalQuestions] = useState("");
  const [usermail, setUsermail] = useState("");

  const [receivedsubject, setReceivedSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [trendingsubjects, setTrendingSubjects] = useState([]);

  const navigate = useNavigate();

  const baseUrl = window.location.origin;
  // alert(baseUrl);
  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/subjectforquiz");
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  const subscribe = async (event) => {
    event.preventDefault();
    if (usermail == "") {
      toastr.error("Kindly enter email address");
    }
    // alert(usermail)

    const response = await fetch("http://127.0.0.1:8000/api/subscribe", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email_address: usermail,
      }),
    });
    const result = await response.json();
    if (response.status == 200) {
      toastr.success(result.msg);
    }
    if (response.status == 202) {
      toastr.error(result.msg);
    }
  };

  const fetchalldata = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/fetchalldata");
      const data = await response.json();
      // setSubjects(data);
      setTotalUsers(data.totalusers);
      setTotalSubjects(data.totalsubjects);
      setTotalQuestions(data.totalquestions);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchtrendingquiz = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/fetchtrendingquiz"
      );
      const data = await response.json();
      // setSubjects(data);
      setTrendingSubjects(data);
      // alert(trendingsubjects)
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  useEffect(() => {
    fetchalldata();
  }, []);
  useEffect(() => {
    fetchtrendingquiz();
  }, []);

  const subjectnameforsearch = (event) => {
    setSearchsubject(event.target.value);
  };
  const getsubject = async (event) => {
    event.preventDefault();
    const uid = localStorage.getItem("user_token");
    const role = localStorage.getItem("role");

    if (uid && role == 2) {
      const response = await fetch(
        "http://127.0.0.1:8000/api/getsearchedsubject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchsubject: searchsubject,
          
          }),
        }
      );

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.status == 202) {
          if(window.confirm("Are you sure you want to start this quiz")){
          const subject_id = data.subject_id;
          const route = `/quiz/${subject_id}`;
          navigate(route);}

          // alert(data.subject_id+'----'+data.subject_name)
        } else {
          // alert()
          toastr.error(data.msg);
        }
      }
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <EntryHeader />
    
      <div className="home-banner bg-fixed">
        <div className="overlay">
          <Container maxWidth="xl">
            {/* <Box> */}
            <Grid
              container
              style={{ paddingTop: 150, paddingBottom: 120, marginTop: 16 }}
              spacing={2}
              direction="row"
              justify="flex-center"
              alignItems="flex-center"
            >
              <Grid item lg={12}>
                <div className="banner-search">
                  <h4 className="banner-text text-center">
                    Grow And Boost Career With Intresting Quizes
                  </h4>
                  <div className="bannersrch d-flex justify-content-center">
                    <form className="bannerForm">
                      <input
                        type="text"
                        class="form-control"
                        id="searchquiz"
                        name="subjectnameforsearch"
                        value={searchsubject}
                        onChange={subjectnameforsearch}
                        placeholder="Enter Quiz Name"
                      />
                      <button type="submit" onClick={getsubject}>
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </Grid>
            </Grid>
            {/* </Box> */}
          </Container>
        </div>
      </div>

      <div className="categor mt-5">
        <Container maxWidth="xl">
          <Box sx={{ height: "100vh" }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className="row mx-0">
                  {subjects
                    .filter((subject) =>
                      [11, 19, 1, 5, 6, 18].includes(subject.id)
                    )
                    .map((subject) => (
                      <div className="col-lg-6 mt-5" key={subject.id}>
                        <div className="category-card box-blue">
                          {subject.id === 11 ? (
                            <Link
                              to={`/quiz/${subject.id}`}
                              className="content"
                            >
                              <i className="fa-solid fa-list-check"></i>
                              <span> {subject.subject_name}</span>
                            </Link>
                          ) : subject.id === 19 ? (
                            <Link
                              to={`/quiz/${subject.id}`}
                              className="content"
                            >
                              <i className="fa-solid fa-square-root-variable"></i>
                              <span> {subject.subject_name}</span>
                            </Link>
                          ) : subject.id === 1 ? (
                            <Link
                              to={`/quiz/${subject.id}`}
                              className="content"
                            >
                              <i className="fa-solid fa-traffic-light"></i>
                              <span> {subject.subject_name}</span>
                            </Link>
                          ) : subject.id === 5 ? (
                            <Link
                              to={`/quiz/${subject.id}`}
                              className="content"
                            >
                              <i className="fa-solid fa-brain"></i>
                              <span> {subject.subject_name}</span>
                            </Link>
                          ) : subject.id === 6 ? (
                            <Link
                              to={`/quiz/${subject.id}`}
                              className="content"
                            >
                              <i className="fa-solid fa-brain"></i>
                              <span> {subject.subject_name}</span>
                            </Link>
                          ) : subject.id === 18 ? (
                            <Link
                              to={`/quiz/${subject.id}`}
                              className="content"
                            >
                              <i className="fa-solid fa-brain"></i>
                              <span> {subject.subject_name}</span>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    ))}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="trend-sidebar mt-5">
                  <h4 className="h4">Trending Quiz</h4>
                  <div className="trending-quiz-items">
                    {trendingsubjects.map((sub) => (
                      <div className="trend-item">
                        <div className="content d-flex">
                          <div className="thumb">
                            <Link>
                              <img
                                className="img-fluid"
                                src="https://validthemes.net/site-template/examin/assets/img/courses/g2.jpg"
                                alt="course-tumb"
                              />
                            </Link>
                          </div>
                          <div className="info">
                            <h4>
                              <Link to={`/quiz/${sub.subject_id}`}>
                                {" "}
                                {sub.subject_name}
                              </Link>
                            </h4>
                            <div className="rating mb-3">
                              <span>
                                {sub.B_count} <small>attempts</small>
                              </span>
                            </div>
                            <div className="owner">
                              <i class="fa-regular fa-user me-2"></i>
                              By <Link>Coding Brains</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="all-quiz py-3 my-2">
                      <Link to="/attemptquiz">
                        BROWSE ALL COURSES{" "}
                        <i class="fa-solid fa-right-long me-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <div className="courses-counter bg-fixed shadow">
        <div className="counter-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="count-fact">
                  <div className="count-icon">
                    <i class="fa-solid fa-tags"></i>
                  </div>
                  <div className="count-info">
                    <span className="timer">{totalusers}</span>
                    <span className="count-tag">Users</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="count-fact">
                  <div className="count-icon">
                    <i class="fa-solid fa-user-graduate"></i>
                  </div>
                  <div className="count-info">
                    <span className="timer">{totalsubjects}</span>
                    <span className="count-tag">Subjects</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="count-fact">
                  <div className="count-icon">
                    <i class="fa-regular fa-id-card"></i>
                  </div>
                  <div className="count-info">
                    <span className="timer">{totalquestions}</span>
                    <span className="count-tag">Total Questions</span>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      <div className="news-latest">
        <Container maxWidth="xl">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={0} sm={2} md={2} />
              <Grid item xs={8} sm={8} md={8} className="text-center">
                <div className="news-head site-heading">
                  <h2>Latest News</h2>
                  <p>
                    Able an hope of body. Any nay shyness article matters own
                    removal nothing his forming. Gay own additions education
                    satisfied the perpetual. If he cause manor happy. Without
                    farther she exposed saw man led. Along on happy could cease
                    green oh.
                  </p>
                </div>
              </Grid>
              <Grid item xs={0} sm={2} md={2} />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} className="p-3">
                <div className="news-item">
                  <div className="news-thumb">
                    <Link>
                      <img
                        className="img-fluid"
                        src="https://validthemes.net/site-template/examin/assets/img/blog/1.jpg"
                        alt="news-thumbnail"
                      />
                    </Link>
                  </div>
                  <div className="news pt-4">
                    <h4>
                      <Link>Objection happiness something</Link>
                    </h4>
                    <p>
                      Sitting mistake towards his few country ask. You delighted
                      two rapturous six depending objection happiness something
                      the partiality unaffected
                    </p>
                    <Link className="news-more">
                      Read More <i class="fa-solid fa-angles-right ms-2"></i>
                    </Link>
                  </div>
                  <div className="news-meta">
                    <div className="author">
                      <Link>
                        {" "}
                        <i class="fa-regular fa-user me-2"></i>{" "}
                        <span>Author</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} className="p-3">
                <div className="news-item">
                  <div className="news-thumb">
                    <Link>
                      <img
                        className="img-fluid"
                        src="https://validthemes.net/site-template/examin/assets/img/blog/2.jpg"
                        alt="news-thumbnail"
                      />
                    </Link>
                  </div>
                  <div className="news pt-4">
                    <h4>
                      <Link>Meant To Learn Of Vexed</Link>
                    </h4>
                    <p>
                      Sitting mistake towards his few country ask. You delighted
                      two rapturous six depending objection happiness something
                      the partiality unaffected
                    </p>
                    <Link className="news-more">
                      Read More <i class="fa-solid fa-angles-right ms-2"></i>
                    </Link>
                  </div>
                  <div className="news-meta">
                    <div className="author">
                      <Link>
                        {" "}
                        <i class="fa-regular fa-user me-2"></i>{" "}
                        <span>Author</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} className="p-3">
                <div className="news-item">
                  <div className="news-thumb">
                    <Link>
                      <img
                        className="img-fluid"
                        src="https://validthemes.net/site-template/examin/assets/img/blog/3.jpg"
                        alt="news-thumbnail"
                      />
                    </Link>
                  </div>
                  <div className="news pt-4">
                    <h4>
                      <Link>Delightful Up Dissimilar</Link>
                    </h4>
                    <p>
                      Sitting mistake towards his few country ask. You delighted
                      two rapturous six depending objection happiness something
                      the partiality unaffected
                    </p>
                    <Link className="news-more">
                      Read More <i class="fa-solid fa-angles-right ms-2"></i>
                    </Link>
                  </div>
                  <div className="news-meta">
                    <div className="author">
                      <Link>
                        {" "}
                        <i class="fa-regular fa-user me-2"></i>{" "}
                        <span>Author</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <div className="join-us drkblu-bg">
        <Container maxWidth="xl">
          <Box style={{ paddingTop: "120px", paddingBottom: "120px" }}>
            <Grid container spacing={4}>
              <Grid item xs={6} sx={{ overflow: "hidden" }}>
                <div className="join-info">
                  <h2>
                    We Work Hard To Prepare Every Student For Their Professional
                    Life
                  </h2>
                  <p>
                    Able an hope of body. Any nay shyness article matters own
                    removal nothing forming. Gay own additions education
                    satisfied the perpetual. If he cause manor hon Without
                    farther she exposed saw man led. Along on happy could cease
                    green Exquisite cordially mr happiness
                  </p>
                  <p>
                    Attachment apartments in delightful by motionless it no. And
                    now she burst sir learn total. Hearing hearted shewing own
                    ask. Solicitude uncommonly use her motionless not collecting
                    age. The properly servants required mistaken outlived bed
                    Friends
                  </p>
                  <Link className="my-btn btn-md btn-light mt-3">
                    Join With Us
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="info-banner">
                  <img
                    className="img-fluid"
                    src="https://validthemes.net/site-template/examin/assets/img/banner/9.jpg"
                    alt="join-us"
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <div className="contact-us">
        <Container maxWidth="xl">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={0} sm={2} md={2} />
              <Grid item xs={8} sm={8} md={8} className="text-center">
                <div className="news-head site-heading">
                  <h2>Contact us</h2>
                  <p>
                    Able an hope of body. Any nay shyness article matters own
                    removal nothing his forming. Gay own additions education
                    satisfied the perpetual. If he cause manor happy. Without
                    farther she exposed saw man led. Along on happy could cease
                    green oh.
                  </p>
                </div>
              </Grid>
              <Grid item xs={0} sm={2} md={2} />

              <Grid item xs={12} sm={12} md={6} lg={4} className="p-3">
                <div className="contact-item">
                  <div className="cont-icon">
                    <i class="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div className="cont-info mt-4">
                    <h4>CALL US</h4>
                    <span>+324 119 2343</span>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} className="p-3">
                <div className="contact-item">
                  <div className="cont-icon">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="cont-info mt-4">
                    <h4>ADDRESS</h4>
                    <span>Coimbtoore India</span>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} className="p-3">
                <div className="contact-item">
                  <div className="cont-icon">
                    <i class="fa-solid fa-envelope-open-text"></i>
                  </div>
                  <div className="cont-info mt-4">
                    <h4>EMAIL US</h4>
                    <span>cb@text.org</span>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={12} lg={12} className="p-3">
                <div className="seprator"></div>
              </Grid>

              <Grid item xs={12} md={6} lg={6} className="p-3">
                <div className="Location-map">
                  <h4>Our Location</h4>
                  <div className="map">
                    <table>
                      <tbody>
                        <tr>
                          <td id="closing-fee-buyer" class="subtotal1">
                            Gomti Nagar,Lucknow
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={6} lg={6} className="p-3">
                <div className="contact">
                  <h4>Contact Us</h4>
                  <p>
                    Occasional terminated insensible and inhabiting gay. So know
                    do fond to half on. Now who promise was justice new winding
                  </p>
                  <form className="contact-form">
                    <div class="mb-3">
                      <input
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        aria-describedby="emailHelp"
                      />
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email*"
                        aria-describedby="emailHelp"
                      />
                      <input
                        type="Text"
                        class="form-control"
                        placeholder="Email*"
                        aria-describedby="emailHelp"
                      />
                      <textarea
                        placeholder="Tell me about quizes"
                        class="form-control"
                        rows="4"
                      />
                      <button type="submit">
                        Send Message <i class="fa-solid fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <div className="modern-footer drkblu-bg">
        <Container maxWidth="xl">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} className="p-3">
                <div className="foot-logo">
                  <figure>
                    <img
                      src="https://validthemes.net/site-template/examin/assets/img/logo-light.png"
                      alt="logo"
                    />
                  </figure>
                  <p>
                    Excellence decisively nay man yet impression for contrasted
                    remarkably. There spoke happy for you are out. Fertile how
                    old address did showing because sitting replied six. Had
                    arose guest visit going off child she new.
                  </p>
                  <div className="foot-social">
                    <ul>
                      <li>
                        <Link>
                          <i class="fa-brands fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <i class="fa-brands fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <i class="fa-brands fa-square-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <i class="fa-brands fa-google-plus-g"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={2} className="p-3">
                <div className="foot-links">
                  <h4 className="foot-h4">Links</h4>
                  <ul>
                    <li>
                      <Link>Quizes</Link>
                    </li>
                    <li>
                      <Link>Gallery</Link>
                    </li>
                    <li>
                      <Link>Event</Link>
                    </li>
                    <li>
                      <Link>FAQ's</Link>
                    </li>
                    <li>
                      <Link>Contact</Link>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={2} className="p-3">
                <div className="foot-links">
                  <h4 className="foot-h4">SUPPORT</h4>
                  <ul>
                    <li>
                      <Link>Documentation</Link>
                    </li>
                    <li>
                      <Link>Forums</Link>
                    </li>
                    <li>
                      <Link>Event</Link>
                    </li>
                    <li>
                      <Link>Release Status</Link>
                    </li>
                    <li>
                      <Link>Feedback</Link>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="foot-reach">
                  <h4 className="foot-h4">Reach Us</h4>
                  <p>
                    {" "}
                    <i class="fa-solid fa-map-location-dot"></i> Coding Brains,
                    Lucknow, India
                  </p>
                  <div className="subs">
                    <h4 className="foot-h4">Subscribe</h4>
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                    <form class="subssend">
                      <input
                        type="text"
                        placeholder="Enter Email"
                        value={usermail}
                        onChange={(e) => setUsermail(e.target.value)}
                        class="form-control"
                      ></input>
                      <button onClick={subscribe}>
                        <i class="fa-solid fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <div className="small-footer">
        <Container maxWidth="xl">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} className="p-4 text-center">
                <p>
                  © Copyright 2023. Developed With ❤ By{" "}
                  <Link>Coding Brains</Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Home;
