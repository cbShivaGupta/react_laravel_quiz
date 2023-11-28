import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';
import { useNavigate, Link } from "react-router-dom";

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { GoogleLogin } from '@react-oauth/google';
import  {jwtDecode} from "jwt-decode";

const ChatBox = () => {
    const navigate = useNavigate();



  return (
    <div className="App">
    <GoogleLogin
      onSuccess={credentialResponse => {

        var credentialResponsedecoded=jwtDecode(credentialResponse.credential);
        navigate('/userdashboard');
        console.log(credentialResponsedecoded);

      }}
    
      onError={() => {
       toastr.error('Login Failed');
      }}
    
    />
</div>
  );
};

export default ChatBox;
