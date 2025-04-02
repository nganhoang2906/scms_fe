import React from "react";
import { Container, Typography, } from "@mui/material";
import SideBar from "../components/SideBar";

const HomePage = () => {
  return (
    <>
      <SideBar/>
      <Container maxWidth="lg" style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h3" gutterBottom>
          HỆ THỐNG QUẢN LÝ CHUỖI CUNG ỨNG
        </Typography>
      </Container>
    </>
  );
};

export default HomePage;
