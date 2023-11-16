import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main", // Assuming you have a primary color defined in your theme
        color: "white",
        textAlign: "center",
        padding: "1rem",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Coding Brains Lko
      </Typography>
     
      {/* You can add additional links or information here */}
      <Link href="#" color="inherit" underline="hover">
        Terms of Service
      </Link>
      {" | "}
      <Link href="#" color="inherit" underline="hover">
        Privacy Policy
      </Link>
    </Box>
  );
};

export default Footer;
