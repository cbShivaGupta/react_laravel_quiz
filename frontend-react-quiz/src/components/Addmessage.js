// YourApp.js
import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor'; // Ensure the correct path
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Addmessage = () => {
  const [editorData, setEditorData] = useState('');
  const [subscriber, setSubscriber] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedSubject, setselectedSubject] = useState('');

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/getsubscriberdetails");
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
    setEditorData("");
    setModalIsOpen(false);
  };

  const handleSubjectChange = (event) => {
    const selectedValue = event.target.value;
    setselectedSubject(selectedValue);

    if (selectedValue === "1") {
      const dynamicContent = `<h2>Greetings from Quiz App</h2><br/>Dear <b>${to}</b>,<br/>We are glad to inform you that a new subject has been added for you to explore yourself further.Click on the link below to view <br/><a href="http://localhost:3000/">Click here to explore</a><br/><br/>Thanks & Regards,<br/><b>Coding Brains IT Solutions,Lucknow</b>`;
      setEditorData(dynamicContent);
    }
    if (selectedValue === "2") {
      const dynamicContent = `<h2>Greetings from Quiz App</h2><br/>Dear <b>${to}</b>,<br/>We are glad to inform you that few new questions has been added for you to explore yourself further.Click on the link below to view <br/><a href="http://localhost:3000/">Click here to explore</a><br/><br/>Thanks & Regards,<br/><b>Coding Brains IT Solutions,Lucknow</b>`;
      setEditorData(dynamicContent);
    }
  };

  const sendEmail = async() => {


    const response = await fetch("http://127.0.0.1:8000/api/sendmail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
          // subject_id: subject1_id,
       
        content: editorData,
        to:to,
       subject: subject,
      }),
    });
    const result = await response.json();
    if(response.status==200){
      toastr.success("Email sent successfully")
    }

// console.log(result)

   
    // Close the modal after sending the email
    setEditorData("");

    closeModal();
  };

  return (
    <div>
      <h1>Subscriber List</h1>
      <table style={{border:"1px solid",fontSize:'30px'}}>
        <thead>
          <tr>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriber.map((subs) => (
            <tr key={subs.email_address}>
              <td>{subs.email_address}</td>
              <td>
                <Link to="#" onClick={() => openModal(subs.email_address)}>
                  Email
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for CKEditor */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
        <div style={{ marginBottom: '20px' }}>
          <h2>EMAIL SUBSCRIBER</h2>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            From:
            <input type="text" style={{ width: '510px' }} value="codingbrains8@gmail.com" onChange={(e) => setFrom(e.target.value)} disabled/>
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            To:
            <input type="text" style={{ width: '531px' }} value={to} onChange={(e) => setTo(e.target.value)} disabled />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Subject:
            <select style={{ width: "500px" }} value={selectedSubject} onChange={handleSubjectChange}>
              <option value="" selected disabled>Select</option>
              <option value="1">New Subjects Added</option>
              <option value="2">New Questions Added</option>
            </select>
          </label>
        </div>
        <RichTextEditor data={editorData} onDataChange={handleEditorChange} editorConfig={{ height: '500px' }} />
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button onClick={sendEmail}>Send Email</button>
          <button onClick={closeModal} style={{ marginLeft: '10px' }}>
            Close
          </button>
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
