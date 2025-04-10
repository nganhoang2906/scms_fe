import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import RegisterForm from "@/components/auth-form/RegisterForm";

class Register extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Đăng ký công ty
          </Typography>
          <RegisterForm />
        </Paper>
      </Container>
    );
  }
}

export default Register;
