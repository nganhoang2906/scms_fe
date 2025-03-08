import React, { useState } from "react";
import { TextField, Button, Container} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (otp.length !== 6) {
      setError("OTP phải có 6 chữ số");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/otp-register", { otp });
      console.log("OTP hợp lệ:", response.data);
      alert("Xác thực thành công! Đang chuyển hướng...");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi xác thực OTP:", error.response ? error.response.data : error);
      setError("Mã OTP không đúng. Vui lòng thử lại!");
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nhập OTP"
          name="otp"
          value={otp}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }}>
          Xác nhận
        </Button>
      </form>
    </Container>
  );
};

export default OtpForm;
