import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import config from '../config';


const Forgetpassword = () => {
  const navigate = useNavigate();
  const apiUrl = config.backendUrl;


  const [formData, setFormData] = useState({
    umail: "",
    upass: "",
    upass_conf: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { umail, upass, upass_conf } = formData;

    if (!umail || !upass || !upass_conf) {
      toastr.error("All fields are required");
      return;
    }
    if (upass != upass_conf) {
      toastr.error("Password didn not match");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 202) {
        const res = await response.json();

        toastr.success(res.msg);
      }
      if (response.status === 400) {
        const res = await response.json();
        toastr.error(res.msg);
      }
    } catch (error) {
      console.error("Error during update:", error);
      toastr.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "80vh" }}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Set to full viewport height
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="umail"
                onChange={handleInputChange}
                required
                fullWidth
                id="umail"
                label="Email Address"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="upass"
                label="New Password"
                type="password"
                id="upass"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="upass_conf"
                label="Confirm Password"
                type="password"
                id="upass_conf"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "primary.main",
              color: "white",
            }}
          >
            UPDATE
          </Button>
          <Grid item>
            <Link to="/login" variant="body2">
              Back To Login
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Forgetpassword;
