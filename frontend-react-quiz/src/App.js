import react from "react";
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
import Userdashboard from "./components/Userdashboard";
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

          <Route path="login" element={<Login />} />
          <Route path="attemptquiz" element={<Attemptquiz />} />
          <Route path="myrecords" element={<Myrecords />} />

          <Route path="userdashboard" element={<Userdashboard />} />
          <Route path="admindashboard" element={<Admindashboard />} />
          <Route path="forgetpassword" element={<Forgetpassword />} />

          <Route path="/addquestion/:subject_id" element={<Userdashboard />} />
          <Route
            path="/addquestiontosubject/:subject1_id"
            element={<Addquestiontosubject />}
          />

          <Route path="/userdashboard/:user_id" element={<Userdashboard />} />
          <Route
            path="/quiz/:selectedSubject/:user_id"
            element={<Displayquestion />}
          />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
