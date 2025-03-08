import React, { Component } from "react";
import { Container, Paper, Typography } from "@mui/material";
import OtpForm from "../components/OtpForm";

class OtpVerification extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Xác thực OTP
          </Typography>
          <OtpForm />
        </Paper>
      </Container>
    );
  }
}

export default OtpVerification;
