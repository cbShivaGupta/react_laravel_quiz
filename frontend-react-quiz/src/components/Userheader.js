import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import config from '../config';


const Userheader=()=>{
  const userid = localStorage.getItem("userid");
  const uid = localStorage.getItem("user_token");
    const [openSidebar, setOpenSidebar] = useState(true);
    const [file, setFile] = useState(null);
    const [filecopy, setFileopy] = useState(null);
  
    const [filename, setFileName] = useState("");
    // const [filename, setFileName] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [userpic, setUserpic] = useState("");




    const baseUrl = window.location.origin;
    const apiUrl = config.backendUrl;


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
        setUsername(res.username);
    
  
        if (res.userpic !== null) {
          setUserpic(res.userpic);
          setFileName(res.userpic);
          // alert(res.backenedbaseurl)
          setFile(res.backenedbaseurl+'/uploads/'+ res.userpic);
          setFileopy(res.userpic);
        }
        else{
          setFileName('download.png');
          setFile(baseUrl+'/images/dummy3.jpg');
          // setFile("http://localhost:3000/images/dummy3.jpg");
  
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProfile();
    }, []);

    const sidebarToggler = () => {
        setOpenSidebar(!openSidebar);
        // alert()
    };

    const handleLogout = () => {
      // Clear the value in local storage
      localStorage.removeItem("user_token");
  
      // You can also perform any other logout-related actions here
      // For example, redirecting the user to the login page
      window.location.href = "/login"; // Replace with your actual logout or redirection logic
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
    return(
        <div className="container-fluid cst-navHead">
<div className="headerContent">
  <button className="asideToggler" onClick={sidebarToggler}>
    <i class="fa-solid fa-bars"></i>
  </button>

  <Dropdown>
  <Dropdown.Toggle
    variant="secondary"
    id="dropdown-basic"
    style={{
      background: "transparent",
      backgroundImage: `url(${file})`,
      backgroundSize: "cover",
      marginRight: "20px",
       // Add other background properties if needed
    }}
  >
    {/* Add your content inside the Dropdown.Toggle */}
  </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item >
      <Link to={`/userprofile`}>
              <i class="fa-regular fa-user" aria-hidden="true"></i>
              <span>Profile</span>
          </Link>
      </Dropdown.Item>
      <Dropdown.Item >
     
          <i class="fa-solid fa-power-off" aria-hidden="true"></i>
          <span><button style={{ border: 'none', backgroundColor: 'transparent' }} className="pks" onClick={handleLogout}>Logout</button></span>
      </Dropdown.Item>
      {/* <Dropdown.Item href="#/action-3">
        Logout
      </Dropdown.Item> */}
    </Dropdown.Menu>
  </Dropdown>
</div>
</div>
    )};
    export default Userheader

