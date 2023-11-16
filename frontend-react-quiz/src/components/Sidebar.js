// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = ({ user_id }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100vh',
        backgroundColor: '#1976d2',
        padding: '20px',
        color: 'white',
        marginTop: '-15px',
      }}
    >
      <List>
        <ListItem button component={Link} to={`/attemptquiz?user_id=${user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton sx={{ color: 'inherit' }}>
            <AssessmentIcon />
          </IconButton>
          <ListItemText primary="Attempt Quiz" />
        </ListItem>
        <ListItem button component={Link} to={`/myrecords?user_id=${user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton sx={{ color: 'inherit' }}>
            <HomeIcon />
          </IconButton>
          <ListItemText primary="My Records" />
        </ListItem>
        <ListItem button component={Link} to={``} style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton sx={{ color: 'inherit' }}>
            <HomeIcon />
          </IconButton>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to={``} style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton sx={{ color: 'inherit' }}>
            <HomeIcon />
          </IconButton>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: 'white', margin: '20px 0' }} />
      <List>
        <ListItem button component={Link} to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton sx={{ color: 'inherit' }}>
            <ExitToAppIcon />
          </IconButton>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
