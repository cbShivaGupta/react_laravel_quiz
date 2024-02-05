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
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { CircularProgress, Paper, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import config from '../config';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const uid = localStorage.getItem("user_token");
  const role = localStorage.getItem("role");
  const apiUrl = config.backendUrl;


  if (uid) {
    if (role == 1) {
      window.location.href = "/admindashboard";
    }
    if (role == 2) {
      window.location.href = "/userdashboard";
    }
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    umail: "",
    upass: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { umail, upass } = formData;

    if (!umail || !upass) {
      toastr.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 203) {
        const res = await response.json();
        const user_token = res.user_token;
        const uid = res.user_id;
        const username=res.uname;
        // alert(username)
        localStorage.setItem("user_token", user_token);
        localStorage.setItem("userid", uid);
        localStorage.setItem("username", username);

        localStorage.setItem("role", res.role);

        if (res.role === 2) {
          navigate("/userdashboard");
        } else {
          navigate("/admindashboard");
        }
      } else {
        toastr.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "80vh" }}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "20px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "primary.main",
              color: "white",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
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
          <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const credentialDecoded = jwtDecode(
                    credentialResponse.credential
                  );
                  console.log(credentialDecoded);

                  const userName = credentialDecoded.given_name;
                  // alert(userName)
                  const userEmail = credentialDecoded.email;
                  const userSecret = credentialDecoded.sub;
                  // alert(userSecret)
                  const apiUrl = `${apiUrl}/googlelogin`;

                  const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user_mail: userEmail,
                      user_secret: userSecret,
                      user_name: userName,
                    }),
                  });

                  const data2 = await response.json();

                  // const res = await response.json();
                  const user_token = data2.user_token;
                  const username = data2.username;

                  localStorage.setItem("user_token", user_token);
                  localStorage.setItem("role", 2);
                  localStorage.setItem("username", username);


                  // console.log(data2);
                  navigate("/");
                } catch (error) {
                  console.error("Error during Google login:", error);
                  toastr.error("Google login failed");
                }
              }}
              onError={() => {
                toastr.error("Login Failed");
              }}
            />
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          An unexpected error occurred. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
