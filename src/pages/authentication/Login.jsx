import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import LoginForm from "@/components/auth-form/LoginForm";

class Login extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Đăng nhập
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    );
  }
}

export default Login;
