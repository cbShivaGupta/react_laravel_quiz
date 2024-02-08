import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
import Usersidebar from "./Usersidebar";
import Userheader from "./Userheader";



const LayoutMain = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

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

  return (
    <>
      <div className={`mainLayout ${openSidebar ? "openSidebar" : ""}`}>
        <aside className={`leftSidebar ${openSidebar ? "" : "close"}`}>
          {/* <div className="asideBrand">LOGO</div>
          <div className="asideLinks">
            <Link className="active">
              <div className="asideIcon">
                <i class="fa-solid fa-gauge-high"></i>
              </div>
              <span>Dashboard</span>
            </Link>

            <Link>
              <div className="asideIcon">
                <i class="fa-solid fa-house"></i>
              </div>
              <span>Home</span>
            </Link>

            <Link>
              <div className="asideIcon">
                <i class="fa-solid fa-folder-closed"></i>
              </div>
              <span>Test</span>
            </Link>

            <Link>
              <div className="asideIcon">
                <i class="fa-solid fa-user"></i>
              </div>
              <span>Profile</span>
            </Link>
          </div> */}
          <Usersidebar />

        </aside>
        <div className="mainContent">
          <nav>
          <Userheader/>
          </nav>
          <main>


          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutMain;
