import React from "react";
import EntryHeader from "./Entryheader";
import Footer from "./Footer";
import { Container, Grid, Button, Typography, Card, CardMedia, CardContent, Box } from "@mui/material";

const Home = () => {
  return (
    <>
      {/* Assuming EntryHeader is defined somewhere */}
      <EntryHeader />

      <div>
        <Container maxWidth="sm" style={{ height: "110px" }}>
          <Typography style={{color:"#FFD700",marginTop:'15px'}} variant="h2">This is Heading 1</Typography>
        </Container>
      </div>

      <div style={{ width: '100%' }}>
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            {/* Image on the left */}
            <Grid item xs={12} md={8} lg={8}>
              <Card>
                <CardMedia
                  component="img"
                  height="518px"
                  width="1000"
                  image="/images/pks1.jpg"
                  alt="Your Image Alt Text"
                />
              </Card>
            </Grid>

            {/* Text on the right */}
            <Grid item xs={12} md={4} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h2" align="center" component="div">
                    Hello, World!
                  </Typography>
                  <Typography variant="h5" align="justify" component="div" paragraph>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                      <Button variant="contained" color="primary">
                        Action2
                      </Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div>
        <Container maxWidth="sm" style={{ height: "110px" }}>
        <Typography style={{color:"#FFD700",marginTop:'15px'}} variant="h2">This is heading 2</Typography>
        </Container>
      </div>

      <div style={{ width: '100%', marginTop: '5px', marginBottom: '100px' }}>
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            {/* Text on the left */}
            <Grid item xs={12} md={4} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h2" align="center" component="div">
                    Hello, World!
                  </Typography>
                  <Typography variant="h5" align="justify" component="div" paragraph>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                      <Button variant="contained" color="primary">
                        Action2
                      </Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Card>
                <CardMedia
                  component="img"
                  height="518px"
                  width="1000"
                  image="/images/pks1.jpg"
                  alt="Your Image Alt Text"
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Home;
