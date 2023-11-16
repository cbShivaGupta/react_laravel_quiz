import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Adminheader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your Logo
        </Typography>
        <Button color="inherit" component={NavLink} to="/contact">
          Contact
        </Button>
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/aboutus">
          AboutUs
        </Button>
        <Button color="inherit" component={NavLink} to="/userlist">
          Userlist
        </Button>
        <Button color="inherit" component={NavLink} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Adminheader;
