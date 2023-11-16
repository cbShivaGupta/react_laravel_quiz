import React from "react";
import { NavLink } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';



const Entryheader = () => {
  return (<>
   <Toolbar style={{backgroundColor:"#1976d2"}}>
      {/* Icon on the left */}
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>

      {/* Icons in the middle (flexible space around them) */}
      <div style={{ flexGrow: 1 }}>
        <IconButton color="inherit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>

      {/* Icon on the right */}
      <IconButton color="inherit" aria-label="account">
        
        <Link to='/login'><AccountCircleIcon /></Link>
      </IconButton>
    </Toolbar>
    </>  );
};

export default Entryheader;
