import react,{ Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/Aboutus";
import Footer from "./components/Footer";
import Maincontent from "./components/Maincontent";
import Userlist from "./components/Userlist";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import Attemptquiz from "./components/Attemptquiz";
import Displayquestion from "./components/Displayquestion";
import Myrecords from "./components/Myrecords";
import Addquestion from "./components/Addquestion";
import Admindashboard from "./components/Admindashboard";
import Showrecords from "./components/Showrecords";
import Addquestiontosubject from "./components/Addquestiontosubject";
import Forgetpassword from "./components/Forgetpassword";
import Sidebar from "./components/Sidebar";
import Adminsidebar from "./components/Adminsidebar";
import Entryheader from "./components/Entryheader";
import Addsubject from "./components/Addsubject";
import Editsubject from "./components/Editsubject";
import Addmessage from "./components/Addmessage";
import Userprofile from "./components/Userprofile";
import Adminprofile from "./components/Adminprofile";

import LayoutMain from "./components/LayoutMain";
import Chart from "./components/Chart";
import Adminchart from "./components/Adminchart";





import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Route } from 'react-router-dom';




import ChatBox from "./components/ChatBox";

// import Logout from "./components/Logout";



import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div
          className="header"
          style={{
            height: "300 px",
            textDecoration: "none",
            backgroundColor: "black",
            color: "yellow",
          }}
        >
        
        </div>
        {/* <Entryheader/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="aboutus" element={<About />} />
          <Route path="userlist" element={<Userlist />} />
          <Route path="register" element={<Register />} />
          <Route path="addquestion" element={<Addquestion />} />
          <Route path="showrecords" element={<Showrecords />} />
          <Route path="userprofile" element={<Userprofile />} />
          <Route path="layoutmain" element={<LayoutMain />} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="chart" element={<Chart/>} />
          <Route path="adminchart" element={<Adminchart/>} />

          
          <Route path="adminprofile" element={<Adminprofile/>} />





          <Route path="login" element={<Login />} />
          <Route path="attemptquiz" element={<Attemptquiz />} />
          <Route path="addsubject" element={<Addsubject />} />

          <Route path="myrecords" element={<Myrecords />} />
          <Route path="userdashboard" element={<UserDashboard />} />

          <Route path="chatbox" element={<ChatBox />} />
          <Route path="admindashboard" element={<Admindashboard />} />
          <Route path="forgetpassword" element={<Forgetpassword />} />
          <Route path="addmessage" element={<Addmessage />} />

          {/* <Route path="logout" element={<Logout />} /> */}


          <Route path="/addquestion/:subject_id" element={<UserDashboard />} />
          <Route
            path="/addquestiontosubject/:subject1_id"
            element={<Addquestiontosubject />}
          />
            <Route
            path="/editsubject/:subject1_id"
            element={<Editsubject />}
          />

          <Route path="/userdashboard/" element={<UserDashboard />} />
          <Route
            path="/quiz/:selectedSubject/"
            element={<Displayquestion />}
          />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
