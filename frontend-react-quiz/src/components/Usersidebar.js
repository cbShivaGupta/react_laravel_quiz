import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';



const Usersidebar = ({ user_id }) => {
    const handleLogout = () => {
      // Clear the value in local storage
      localStorage.removeItem("user_token");
  
      // You can also perform any other logout-related actions here
      // For example, redirecting the user to the login page
      window.location.href = "/login"; // Replace with your actual logout or redirection logic
    };

    // const [openSidebar, setOpenSidebar] = useState(true);

    // const sidebarToggler = () => {
    //   setOpenSidebar(!openSidebar);
    // };
  
    // useEffect(() => {
    //   const resizeSidebar = () => {
    //     if (window.innerWidth <= 1200 && openSidebar) {
    //       setOpenSidebar(false);
    //     }
    //   };
    //   window.addEventListener("resize", resizeSidebar);
    //   return () => {
    //     window.removeEventListener("resize", resizeSidebar);
    //   };
    // }, [openSidebar]);
  
    return (
    <>


<div className="asideBrand">LOGO</div>
<div className="asideLinks">
  <NavLink to={`/userdashboard`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-gauge-high"></i>
    </div>
    <span>Dashboard</span>
  </NavLink>

  <NavLink to={`/attemptquiz`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-house"></i>
    </div>
    <span>Attempt Quiz</span>
  </NavLink>

  <NavLink to={`/myrecords`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-folder-closed"></i>
    </div>
    <span>My records</span>
  </NavLink>

  <NavLink to={`/userprofile`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-user"></i>
    </div>
    <span>Profile</span>
  </NavLink>
</div>

</>  )};
    export default Usersidebar;
