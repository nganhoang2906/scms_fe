import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import RegisterForm from "../components/RegisterForm";

class Register extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Đăng ký công ty
          </Typography>
          <RegisterForm />
        </Paper>
      </Container>
    );
  }
}

export default Register;
