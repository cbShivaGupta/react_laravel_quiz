import React from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Adminsidebar from './Adminsidebar'; 


const Admindashboard = () => {
//   const { user_id } = useParams();

  return (
<div>
  <div style={{float:"left"}}>
    <Adminsidebar />
  </div>
  <div style={{float:"right"}}>
    this is dashboard
  </div>
</div>
  );
}

export default Admindashboard;
