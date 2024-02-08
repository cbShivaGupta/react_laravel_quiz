import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import config from '../config';
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";
// import Adminprofile from "./components/Adminprofile";




const Adminprofile = () => {
  const userid = localStorage.getItem("userid");
  const uid = localStorage.getItem("user_token");
  if(!uid){window.location.href = "/login";}



  const [file, setFile] = useState(null);
  const [filecopy, setFileopy] = useState(null);

  const [filename, setFileName] = useState("");
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userpass, setUserpass] = useState("");
  const [userpic, setUserpic] = useState("");
  const [loading, setLoading] = useState(true);
  const [designation, setDesignation] = useState("");
  const [city, setCity] = useState("");




  const baseUrl = window.location.origin;
  const apiUrl = config.backendUrl;
  // alert(apiUrl)



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
      setUsermail(res.usermail);
      setUserpass(res.userpass);
      setDesignation(res.designation)
      setCity(res.city)


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

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileName(e.target.files[0]);
  }

  const updateProfile = async (e) => {
    e.preventDefault();

    // if (!filename || !filename.name) {
    //   toastr.error("Please select an image");
    //   return;
    // }

    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("username", username);
    formData.append("usermail", usermail);
    formData.append("userpass", userpass);
    if(filecopy!=filename){
      formData.append("image_changed",1)
    formData.append("userpic", filename);}
    else{
      formData.append("image_changed",0)
    }

    formData.append("designation", designation);
    formData.append("city", city);

    try {
      const response = await fetch(`${apiUrl}/updateprofile`, {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      if (response.status === 200) {
        toastr.success("Updated successfully");
      } else {
        toastr.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
        <Adminsidebar />

      </aside>
      <div className="mainContent">
        <nav>
        <Adminheader/>
        </nav>



    <main className="cst-main">
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="profileCover">
            <div className="card">
              <div className="card-body p-3">
                <div className="coverImg position-relative">
                    <div className="coverPhoto"></div>
                </div>
                <div className="ProfileInfo p-3 d-flex">
                  <div className="Pic">
                    <img className="img-fluid rounded" src={file} alt="" />
                  </div>
                  <div className="Details">
                    <div className="profileName">
                      <h4 className="txt-blue">{username}</h4>
                      <p>{designation}</p>
                    </div>
                    <div className="profileEmail">
                      <h4>{usermail}</h4>
                      <p>Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="aboutInfo">
                  <div className="card-head">Personal Info</div>

                  <div className="personInfo">
                  
                    <div className="myInfo">
                      <h4>Name :</h4>
                      <span>{username} </span>
                    </div>
                    <div className="myInfo">
                      <h4>Email :</h4>
                      <span>{usermail}</span>
                    </div>
                    <div className="myInfo">
                      <h4>Designation :</h4>
                      <span>{designation}</span>
                    </div>
                    <div className="myInfo">
                      <h4>city :</h4>
                      <span>{city}</span>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="changeProfile">
            <div className="card">
              <div className="card-body p-3">
                <div className="card-head">Profile Settings</div>
                <form action="" className="cst-form">
                  <div className="row">

                  <div className="col-lg-6 mb-3">
                      <label class="form-label">Name</label>
                      <input type="text" class="form-control" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label class="form-label">Email</label>
                      <input type="text" class="form-control" name="usermail" onChange={(e) => setUsermail(e.target.value)} value={usermail} />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label class="form-label">Designation</label>
                      <input type="text" class="form-control" name="userpass" onChange={(e) => setDesignation(e.target.value)} value={designation} />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label class="form-label">City</label>
                      <input type="text" class="form-control" name="userpass" onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>
                  


                    <div className="image-upload" style={{ marginBottom: "20px" }}>
            <input type="file" onChange={handleChange} />
            {file && <img src={file}  style={{ width: "100px", height: "100px", marginTop: "10px" }} />}
          </div>
          <button onClick={updateProfile} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Update
          </button>


                    <div className="col-12 my-3 text-end">
                      {/* <button className="cst-btn btn-blue">Save</button> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
      </div>
    </div>
  </>

    
  );
};

export default Adminprofile;
