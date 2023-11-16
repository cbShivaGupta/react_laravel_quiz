import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

const Dashboard=()=>{
    return(
        <div style={{ height: "600px" }}>
        <div style={{ height: "200px",backgroundColor:"black",color:"yellow" }}><Link to="/addtrain">Add Train</Link></div>
        <div style={{ height: "200px" ,backgroundColor:"black",color:"yellow"}}><Link to="/searchtrain">Search Train</Link></div>

       this is dashboard
        </div>
    )
}
export default Dashboard