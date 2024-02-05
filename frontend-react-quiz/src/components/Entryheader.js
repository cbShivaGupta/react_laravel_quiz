import * as React from "react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import "../custom.css";
import config from '../config';


const Header = () => {

  const [file, setFile] = useState(null);
  const [myuserid, setMyUserid] = useState(null);
  const baseUrl = window.location.origin;
  const apiUrl = config.backendUrl;


// alert(baseUrl)


  const fixNav = document.querySelector(".cst-main-header");
  const scrollTrigger = window.scrollY;
  const uid = localStorage.getItem("user_token");

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("userid");



  const fetchProfile = async () => {
    try {
      const response = await fetch(`${apiUrl}/fetchprofile`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userid: userid,
        }),
      });
      const res = await response.json();
     

      if (res.userpic !== null) {
      
        setFile(res.backenedbaseurl+'/uploads/'+ res.userpic);
      }
      else{
     
        setFile(baseUrl+'/images/dummy3.jpg');

      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } 
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    window.location.href = "/login"; // Replace with your actual logout or redirection logic
  };

  return (
    <div className="position-relative">
      <nav className="contact-nav d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div class="nav-info-box my-2">
                <ul className="mb-0">
                  <li>Have any question? +123 456 7890</li>
                  <li>
                    <i class="fas fa-envelope-open mx-2"></i>
                    codingbrains8@gmail.com
                  </li>
                  <li>
                    <i class="fas fa-clock mx-2"></i>
                    Mon - Fri <span>15:00 - 24:00</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 text-end">
              <a href="#" className="nav-a">
                Contact Now
              </a>
            </div>
          </div>
        </div>
      </nav>
      <nav class="navbar navbar-expand-lg bg-body-tertiary cst-main-header">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="https://validthemes.net/site-template/examin/assets/img/logo.png"></img>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav header-ul">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Category
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/attemptquiz">
                  Course
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Blog
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown profile-drop">
         
{uid ?(<img data-bs-toggle="dropdown"
              aria-expanded="false"
              class="fa-regular fa-circle-user" style={{width:"100px",height:"90px"}} src={file}/>):(<i
                data-bs-toggle="dropdown"
                aria-expanded="false"
                class="fa-regular fa-circle-user"
              ></i>)}

             
            
      <b>{uid?(username):""}</b>

            <ul class="dropdown-menu cst-profile-menu py-0">
              <li>
                <a class="dropdown-item border-bottom" href="#">
                  <i class="mx-2 fa-regular fa-user"></i> 
                  
                 <Link to='/userprofile'>Profile</Link> 
                </a>
              </li>
              <li>
                <a class="dropdown-item border-bottom" href="#">
                  <i class="mx-2 fa-solid fa-user-gear"></i> Settings
                </a>
              </li>
              <li>
                {uid ? (
                  <button
                    class="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i class="mx-2 fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                ) : (
                  <button
                    class="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i class="mx-2 fa-solid fa-right-from-bracket"></i> Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
