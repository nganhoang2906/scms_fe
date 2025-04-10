import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import OtpVerificationForm from "@/components/auth-form/OtpVerificationForm";

class OtpVerification extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Xác thực OTP
          </Typography>
          <OtpVerificationForm />
        </Paper>
      </Container>
    );
  }
}

export default OtpVerification;
