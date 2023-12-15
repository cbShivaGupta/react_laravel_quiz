// import React from "react";
// import { NavLink } from "react-router-dom";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { Link } from "react-router-dom";
// import { AppBar } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";

// import ChatIcon from "@mui/icons-material/Chat";

// const Entryheader = () => {
//   return (
//     <>
//       <AppBar position="fixed">
//         <Toolbar style={{ backgroundColor: "#1976d2" }}>
//           {/* Icon on the left */}
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>

//           {/* Icons in the middle (flexible space around them) */}
//           <div style={{ flexGrow: 1 }}>
//             <IconButton color="inherit" aria-label="search">
//               <SearchIcon />
//             </IconButton>
//           </div>

//           {/* Icon on the right */}
//           <IconButton color="inherit" aria-label="account">
//             <Link to="/login">
//               <AccountCircleIcon />
//             </Link>
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };

// export default Entryheader;


// import React from "react";
// import { NavLink } from "react-router-dom";
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Link } from 'react-router-dom';

// const Entryheader = () => {
//   return (<>
//    <Toolbar style={{backgroundColor:"#1976d2"}}>
//       {/* Icon on the left */}
//       <IconButton edge="start" color="inherit" aria-label="menu">
//         <MenuIcon />
//       </IconButton>

//       {/* Icons in the middle (flexible space around them) */}
//       <div style={{ flexGrow: 1 }}>
//         <IconButton color="inherit" aria-label="search">
//           <SearchIcon />
//         </IconButton>
//       </div>

//       {/* Icon on the right */}
//       <IconButton color="inherit" aria-label="account">

//         <Link to='/login'><AccountCircleIcon /></Link>
//       </IconButton>
//     </Toolbar>
//     </>  );
// };

// export default Entryheader;
import * as React from "react";
import "../custom.css";

function Header() {
  const fixNav = document.querySelector(".cst-main-header");
  const scrollTrigger = window.scrollY;


  const handleLogout = () => {
    // Clear the value in local storage
    localStorage.removeItem("user_token");

    // You can also perform any other logout-related actions here
    // For example, redirecting the user to the login page
    window.location.href = "/login"; // Replace with your actual logout or redirection logic
  };


  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > scrollTrigger) {
  //     fixNav.classList.add("fix-header");
  //   } else {
  //     fixNav.classList.remove("fix-header");
  //   }
  // });

  // const headerEl = document.querySelector(".cst-main-header");
  // const scrollThreshold = 500;
  // window.onscroll = function () {
  //   if (window.scrollY >= scrollThreshold) {
  //     headerEl.classList.add("fix-header");
  //   } else {
  //     headerEl.classList.remove("fix-header");
  //   }
  // };

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
                    Info@gmail.com
                  </li>
                  <li>
                    <i class="fas fa-clock mx-2"></i>
                    Sun - Thu <span>8:00 - 16:00</span>
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
                <a class="nav-link" href="#">
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
            <i
              data-bs-toggle="dropdown"
              aria-expanded="false"
              class="fa-regular fa-circle-user"
            ></i>

            <ul class="dropdown-menu cst-profile-menu py-0">
              <li>
                <a class="dropdown-item border-bottom" href="#">
                  <i class="mx-2 fa-regular fa-user"></i> Profile
                </a>
              </li>
              <li>
                <a class="dropdown-item border-bottom" href="#">
                  <i class="mx-2 fa-solid fa-user-gear"></i> Settings
                </a>
              </li>
              <li>
            
              <button  class="dropdown-item text-danger" onClick={handleLogout}>   
                  <i class="mx-2 fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;

