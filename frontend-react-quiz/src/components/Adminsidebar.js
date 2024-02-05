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
  
    return (<>


<div className="asideBrand">LOGO</div>
<div className="asideLinks">
  <NavLink to={`/admindashboard`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-gauge-high"></i>
    </div>
    <span>Dashboard</span>
  </NavLink>

  <NavLink to={`/addsubject`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-house"></i>
    </div>
    <span>Add Subject</span>
  </NavLink>

  <NavLink to={`/addquestion`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-folder-closed"></i>
    </div>
    <span>Subject Management</span>
  </NavLink>
  <NavLink to={`/addmessage`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-folder-closed"></i>
    </div>
    <span>Message subscriber</span>
  </NavLink>

  <NavLink to={`/adminprofile`} activeClassName="active">
    <div className="asideIcon">
      <i class="fa-solid fa-user"></i>
    </div>
    <span>Profile</span>
  </NavLink>
</div>

</>  )};
    export default Usersidebar;
