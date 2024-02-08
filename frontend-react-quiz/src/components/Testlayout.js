import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";

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
          <div className="asideBrand">Welcome</div>
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
          </div>
        </aside>
        <div className="mainContent">
          <nav>
            <div className="container-fluid cst-navHead">
              <div className="headerContent">
                <button className="asideToggler" onClick={sidebarToggler}>
                  <i class="fa-solid fa-bars"></i>
                </button>

                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    className="cst-userDrop"
                    id="dropdown-basic"
                  ><i class="fa-regular fa-circle-user"></i> <span>Prakhar Srivastav</span></Dropdown.Toggle>

                  <Dropdown.Menu className="p-0 userDrop-menu">
                    <Dropdown.Item href="#/action-1">
                        <Link>
                            <i class="fa-regular fa-user" aria-hidden="true"></i>
                            <span>Profile</span>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <Link>
                          <i class="fa-solid fa-power-off" aria-hidden="true"></i>
                          <span>Logout</span>
                      </Link>
                    </Dropdown.Item>
                    {/* <Dropdown.Item href="#/action-3">
                      Logout
                    </Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
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
                            <img className="img-fluid rounded" src="https://w3crm.dexignzone.com/xhtml/images/profile/profile.png" alt="" />
                          </div>
                          <div className="Details">
                            <div className="profileName">
                              <h4 className="txt-blue">Mr. Prakhar Srivsatav</h4>
                              <p>UI / Backend Dev</p>
                            </div>
                            <div className="profileEmail">
                              <h4>srivastsv@test.com</h4>
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
                          <div className="aboutMe">
                            <h4 className="abouth4">About Me</h4>
                            <p>A wonderful serenity has taken possession of my entire soul, like these sweet 
                              mornings of spring which I enjoy with my whole heart. I am alone, and feel the 
                              charm of existence was created for the bliss of souls like mine.I am so happy, 
                              my dear friend, so absorbed in the exquisite sense of mere tranquil existence, 
                              that I neglect my talents.
                            </p>
                            <p>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there 
                              hung a picture that he had recently cut out of an illustrated 
                              magazine and housed in a nice, gilded frame.
                            </p>
                          </div>
                          <div className="personInfo">
                            <h4 className="abouth4">Personal Info</h4>
                            <div className="myInfo">
                              <h4>Name :</h4>
                              <span>Mr. Prakhar srivastava</span>
                            </div>
                            <div className="myInfo">
                              <h4>Email :</h4>
                              <span>example@examplel.com</span>
                            </div>
                            <div className="myInfo">
                              <h4>Availability :</h4>
                              <span>Full Time </span>
                            </div>
                            <div className="myInfo">
                              <h4>Age :</h4>
                              <span>28 </span>
                            </div>
                            <div className="myInfo">
                              <h4>Location :</h4>
                              <span>Meer Peer, Jhumri Taliya UP</span>
                            </div>
                            <div className="myInfo">
                              <h4>Nationality :</h4>
                              <span>Indian</span>
                            </div>
                            <div className="myInfo">
                              <h4>Language :</h4>
                              <span>Hindi, Urdu, Angreezi</span>
                            </div>
                            <div className="myInfo">
                              <h4>Year Experience :</h4>
                              <span>07 Year Experiences</span>
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
                              <label class="form-label">Email</label>
                              <input type="email" placeholder="Email" class="form-control"></input>
                            </div>
                            <div className="col-lg-6 mb-3">
                              <label class="form-label">Password</label>
                              <input type="password" placeholder="Password" class="form-control" />
                            </div>
                            <div className="col-lg-12 mb-3">
                              <label class="form-label">Address</label>
                              <input type="text" placeholder="Address" class="form-control" />
                            </div>
                            <div className="col-12 my-3 text-end">
                              <button className="cst-btn btn-blue">Save</button>
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

export default LayoutMain;
