import React, { useState } from "react";
import { Container, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
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
      const response = await axios.post("http://localhost:8080/login", formData);
      
      if (response.data.statusCode !== 200) {
        setErrors({ apiError: response.data.message });
      } else {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
  
        // Gọi API lấy thông tin user
        const profileResponse = await axios.get("http://localhost:8080/get-profile", {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        });
  
        if (profileResponse.data.statusCode === 200) {
          const userData = profileResponse.data.ourUser;
          const employeeId = userData?.employee?.employeeId;
          const departmentId = userData?.employee?.department?.departmentId;
          const companyId = userData?.employee?.department?.company?.companyId;

          localStorage.setItem("employeeId", employeeId);
          localStorage.setItem("departmentId", departmentId);
          localStorage.setItem("companyId", companyId);
          
          console.log("Employee ID:", employeeId);
          console.log("Department ID:", departmentId);
          console.log("Company ID:", companyId);
        }
  
        navigate("/homepage");
      }
    } catch (error) {
      setErrors({
        apiError: error.response?.data?.message || "Đăng nhập thất bại! Vui lòng thử lại.",
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography align="center">Đăng nhập để sử dụng hệ thống SCMS</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} margin="normal" required />
        <TextField fullWidth label="Mật khẩu" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} margin="normal" required InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />
        {errors.apiError && <Typography color="error" align="center" sx={{ mt: 1 }}>{errors.apiError}</Typography>}
        <Button type="submit" variant="contained" color="default" fullWidth style={{ marginTop: "10px" }}>Đăng nhập</Button>
        <Typography align="center" sx={{ mt: 1 }}>
          <Button color="default" onClick={() => navigate("/register")}>Đăng ký</Button> | <Button color="default" onClick={() => navigate("/forgot-password")}>Quên mật khẩu?</Button>
        </Typography>
      </form>
    </Container>
  );
};

export default LoginForm;