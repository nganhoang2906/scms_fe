import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      alert("Đăng nhập thành công!");
      localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
      navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.response ? error.response.data : error);
      alert("Đăng nhập thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Mật khẩu"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }}>
          Đăng nhập
        </Button>
      </form>
    </Container>
  );
};

export default Login;
