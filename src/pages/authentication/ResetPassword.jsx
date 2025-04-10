import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import ResetPasswordForm from "@components/auth-form/ResetPasswordForm";

class ResetPassword extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Đặt lại mật khẩu
          </Typography>
          <ResetPasswordForm />
        </Paper>
      </Container>
    );
  }
}

export default ResetPassword;
