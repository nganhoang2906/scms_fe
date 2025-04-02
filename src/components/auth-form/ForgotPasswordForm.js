import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../themes/alert";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email không hợp lệ";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(`http://localhost:8080/send-verify-otp?email=${email}`);
      
      if (response.data.statusCode !== 200) {
        setErrors({ apiError: response.data.message });
      } else {

        localStorage.setItem("forgotEmail", email);
        const storedEmail = localStorage.getItem("forgotEmail");

        Alert.success("Kiểm tra email để nhận mã OTP.");
        navigate("/verify-forgot-password-otp");
        
        console.log(storedEmail)
      }
    } catch (error) {
      setErrors({
        apiError: error.response?.data?.message || "Không thể gửi OTP! Vui lòng thử lại.",
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography align="center">Nhập email của bạn để nhận mã xác thực</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} margin="normal" required />
        {errors.apiError && ( <Typography color="error" align="center" sx={{ mt: 1 }}> {errors.apiError} </Typography>)}
        <Button type="submit" variant="contained" color="default" fullWidth sx={{ mt: 2 }}>
          Gửi mã OTP
        </Button>
        <Typography align="center" sx={{ mt: 1 }}>
          <Button color="default" onClick={() => navigate("/login")}>
            Quay lại đăng nhập
          </Button>
        </Typography>
      </form>
    </Container>
  );
};

export default ForgotPasswordForm;
