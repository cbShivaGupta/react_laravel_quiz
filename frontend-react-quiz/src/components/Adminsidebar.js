// Adminsidebar.js
import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Adminsidebar = () => {
  const handleLogout = () => {
    // Clear the value in local storage
    localStorage.removeItem("user_token");

    // You can also perform any other logout-related actions here
    // For example, redirecting the user to the login page
    window.location.href = "/login"; // Replace with your actual logout or redirection logic
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100vh",
        width: "250px", // Set a fixed width for the sidebar
        backgroundColor: "#1976d2",
        padding: "20px",
        color: "white",
      }}
    >
        <List>
        <ListItem
          button
          component={Link}
          to="/addsubject"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton sx={{ color: "inherit" }}>
            <AssessmentIcon />
          </IconButton>
          <ListItemText primary="Add Subject" />
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          component={Link}
          to="/addquestion"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton sx={{ color: "inherit" }}>
            <AssessmentIcon />
          </IconButton>
          <ListItemText primary="Add Question" />
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: "white", margin: "20px 0" }} />
      <List>
        <ListItem
          button
          onClick={handleLogout}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton sx={{ color: "inherit" }}>
            <ExitToAppIcon />
          </IconButton>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Adminsidebar;
