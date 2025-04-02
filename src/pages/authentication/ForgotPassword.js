import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import ForgotPasswordForm from "../../components/auth-form/ForgotPasswordForm";

class ForgotPassword extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Lấy lại mật khẩu
          </Typography>
          <ForgotPasswordForm />
        </Paper>
      </Container>
    );
  }
}

export default ForgotPassword;
