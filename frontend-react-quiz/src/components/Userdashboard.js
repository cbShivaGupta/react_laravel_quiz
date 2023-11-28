import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";

const UserDashboard = () => {
  const uid = localStorage.getItem("user_token");
  if (uid) {
  } else {
    window.location.href = "/login";
  }
  const { user_id } = useParams();

  return (
    <div>
      <div style={{ float: "left" }}>
        {" "}
        <Sidebar user_id={user_id} />
      </div>
      <div tyle={{ float: "right" }}>
        {" "}
        <p>this is userdashboard</p>
      </div>
    </div>
  );
};

export default UserDashboard;
