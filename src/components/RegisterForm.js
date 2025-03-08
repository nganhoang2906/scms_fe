import React, { useState } from "react";
import { TextField, Button, FormControlLabel, Checkbox, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate thay vì withRouter
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    taxCode: "",
    companyName: "",
    address: "",
    country: "",
    phoneNumber: "",
    companyCode: "",
    position: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email không được để trống";
    if (!formData.username) errors.username = "Tên đăng nhập không được để trống";
    if (!formData.password) errors.password = "Mật khẩu không được để trống";
    if (!formData.taxCode) errors.taxCode = "Mã số thuế là bắt buộc";
    if (!formData.companyName) errors.companyName = "Tên công ty không được để trống";
    if (!formData.phoneNumber) errors.phoneNumber = "Số điện thoại không được để trống";
    if (!formData.termsAccepted) errors.termsAccepted = "Bạn phải đồng ý với điều khoản";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      await axios.post("http://localhost:8080/register", formData);
      alert("Đăng ký thành công! Kiểm tra email để nhận mã OTP.");
      navigate("/otp-verification"); // Điều hướng đúng cách
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response ? error.response.data : error);
      alert("Đăng ký thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} margin="normal" required />
        <TextField fullWidth label="Tên đăng nhập" name="username" value={formData.username} onChange={handleChange} error={!!errors.username} helperText={errors.username} margin="normal" required />
        <TextField fullWidth label="Mật khẩu" name="password" type="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} margin="normal" required />
        <TextField fullWidth label="Mã số thuế" name="taxCode" value={formData.taxCode} onChange={handleChange} error={!!errors.taxCode} helperText={errors.taxCode} margin="normal" required />
        <TextField fullWidth label="Tên công ty" name="companyName" value={formData.companyName} onChange={handleChange} error={!!errors.companyName} helperText={errors.companyName} margin="normal" required />
        <TextField fullWidth label="Địa chỉ công ty" name="address" value={formData.address} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Quốc gia" name="country" value={formData.country} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Số điện thoại" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={!!errors.phoneNumber} helperText={errors.phoneNumber} margin="normal" required />
        <TextField fullWidth label="Mã công ty" name="companyCode" value={formData.companyCode} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Vị trí công việc" name="position" value={formData.position} onChange={handleChange} margin="normal" />

        <FormControlLabel
          control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />}
          label="Tôi đồng ý với điều khoản sử dụng"
        />
        {errors.termsAccepted && <Typography color="error">{errors.termsAccepted}</Typography>}

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!formData.termsAccepted} style={{ marginTop: "10px" }}>
          Đăng ký
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
