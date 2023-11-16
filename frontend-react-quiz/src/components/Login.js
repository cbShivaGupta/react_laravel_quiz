import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    umail: '',
    upass: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { umail, upass } = formData;

    if (!umail || !upass) {
      toastr.error('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 203) {
        const res = await response.json();

        if (res.role === 2) {
          navigate(`/userdashboard/${res.user_id}`);
        } else {
          navigate('/admindashboard');
        }
      } else {
        toastr.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toastr.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "80vh" }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Set to full viewport height
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
                label="Password"
                type="password"
                id="upass"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'primary.main', color: 'white' }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="space-between">
            <Grid item>
            Don't have an account? 
              <Link to="/register" variant="body2">
               Sign up
              </Link>
            </Grid>
            <Grid item>
              <Link to="/forgetpassword" variant="body2">
                Forgot Password
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
