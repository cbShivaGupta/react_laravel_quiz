import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import toastr from 'toastr';
import config from '../config';

import 'toastr/build/toastr.min.css';
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const Addmessage = () => {
  const [editorData, setEditorData] = useState('');
  const [subscriber, setSubscriber] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedSubject, setselectedSubject] = useState('');
  const apiUrl = config.backendUrl;


  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(`${apiUrl}/getsubscriberdetails`);
      const data = await response.json();
      setSubscriber(data);
    };

    getdata();
  }, []);

  const handleEditorChange = (data) => {
    setEditorData(data);
  };

  const openModal = (email) => {
    setTo(email);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditorData('');
    setModalIsOpen(false);
  };

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


  const handleSubjectChange = (event) => {
    const selectedValue = event.target.value;
    setselectedSubject(selectedValue);

    if (selectedValue === '1') {
      const dynamicContent = `<h2>Greetings from Quiz App</h2><br/>Dear <b>${to}</b>,<br/>We are glad to inform you that a new subject has been added for you to explore yourself further.Click on the link below to view <br/><a href="http://localhost:3000/">Click here to explore</a><br/><br/>Thanks & Regards,<br/><b>Coding Brains IT Solutions,Lucknow</b>`;
      setEditorData(dynamicContent);
    }
    if (selectedValue === '2') {
      const dynamicContent = `<h2>Greetings from Quiz App</h2><br/>Dear <b>${to}</b>,<br/>We are glad to inform you that few new questions have been added for you to explore yourself further.Click on the link below to view <br/><a href="http://localhost:3000/">Click here to explore</a><br/><br/>Thanks & Regards,<br/><b>Coding Brains IT Solutions,Lucknow</b>`;
      setEditorData(dynamicContent);
    }
  };

  const sendEmail = async () => {
    const response = await fetch(`${apiUrl}/sendmail`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        content: editorData,
        to: to,
        subject: subject,
      }),
    });

    if (response.status === 200) {
      toastr.success('Email sent successfully');
    }

    closeModal();
  };

  return (
    <div className={`mainLayout ${openSidebar ? "openSidebar" : ""}`}>
      <aside className={`leftSidebar ${openSidebar ? "" : "close"}`}>
              <Adminsidebar />

      </aside>
      <div className="mainContent">
          <nav>
            <Adminheader />
          </nav>
          <main className="cst-main">
      <h1>Subscriber List</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{color:"red", fontSize:"30px"}}>Email Address</TableCell>
              <TableCell style={{color:"green", fontSize:"30px"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriber.map((subs) => (
              <TableRow key={subs.email_address}>
                <TableCell>{subs.email_address}</TableCell>
                <TableCell>
                  <Link to="#" onClick={() => openModal(subs.email_address)}>
                    Email
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </main>
      </div>

      {/* Modal for CKEditor */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
        <div style={{ marginBottom: '20px' }}>
          <h2>EMAIL SUBSCRIBER</h2>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <TextField
            label="From"
            variant="outlined"
            fullWidth
            value="codingbrains8@gmail.com"
            onChange={(e) => setFrom(e.target.value)}
            disabled
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <TextField
            label="To"
            variant="outlined"
            fullWidth
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            select
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value="1">New Subjects Added</MenuItem>
            <MenuItem value="2">New Questions Added</MenuItem>
          </TextField>
        </div>
        <RichTextEditor data={editorData} onDataChange={handleEditorChange} editorConfig={{ height: '500px' }} />
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={sendEmail}>
            Send Email
          </Button>
          <Button onClick={closeModal} style={{ marginLeft: '10px' }}>
            Close
          </Button>
        </div>
      </Modal>

    </div>
  );
};

// Style for the modal
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    minHeight: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
};

export default Addmessage;
