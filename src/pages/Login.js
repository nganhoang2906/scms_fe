import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

class Login extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Đăng nhập
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    );
  }
}

export default Login;
