import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, MenuItem, Button, Grid, Paper, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllDepartmentsInCompany } from "@/services/general/DepartmentService";
import { createEmployee } from "@/services/general/EmployeeService";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");
  const [errors, setErrors] = useState({});

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    employeeCode: "",
    employeeName: "",
    position: "",
    gender: "",
    address: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    employmentStartDate: "",
    departmentId: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartmentsInCompany(companyId, token);
        setDepartments(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng ban:", error);
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy danh sách phòng ban!");
      }
    };
    fetchDepartments();
  }, [companyId, token]);

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.departmentId) errors.departmentId = "Phòng ban không được để trống";
    if (!formData.position?.trim()) errors.position = "Chức vụ không được để trống";
    if (!formData.employeeCode?.trim()) errors.employeeCode = "Mã nhân viên không được để trống";
    if (!formData.employeeName?.trim()) errors.employeeName = "Họ và tên không được để trống";

    if (!formData.email?.trim()) {
      errors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }
  
    if (!formData.phoneNumber?.trim()) errors.phoneNumber = "Số điện thoại không được để trống";
    if (!/^\d{10,11}$/.test(formData.phoneNumber)) errors.phoneNumber = "Số điện thoại không hợp lệ";
  

    if (!formData.username.trim()) errors.username = "Tên đăng nhập không được để trống";
    if (!formData.password.trim()) {
      errors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      await createEmployee(formData, token);
      navigate("/employee-in-company");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi tạo nhân viên!");
    }
  };

  const handleCancel = () => {
    navigate("/employee-in-company");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Thêm mới nhân viên
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Phòng ban" name="departmentId" value={formData.departmentId} error={!!errors.departmentId} helperText={errors.departmentId} onChange={handleChange} required>
              {departments.map((dept) => (
                <MenuItem key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Chức vụ" name="position" value={formData.position} error={!!errors.position} helperText={errors.position} required onChange={handleChange}>
              <MenuItem value="Quản lý">Quản lý</MenuItem>
              <MenuItem value="Nhân viên">Nhân viên</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mã nhân viên" name="employeeCode" value={formData.employeeCode} error={!!errors.employeeCode} helperText={errors.employeeCode} required onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Họ tên" name="employeeName" value={formData.employeeName} error={!!errors.employeeName} helperText={errors.employeeName} required onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Ngày sinh" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Giới tính" name="gender" value={formData.gender} onChange={handleChange}>
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" value={formData.email} error={!!errors.email} helperText={errors.email} required onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số điện thoại" name="phoneNumber" value={formData.phoneNumber} error={!!errors.phoneNumber} helperText={errors.phoneNumber} required onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Tên đăng nhập" name="username" value={formData.username} error={!!errors.username} helperText={errors.username} required onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mật khẩu" name="password" type="password" value={formData.password} error={!!errors.password} helperText={errors.password} required onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Ngày bắt đầu làm" name="employmentStartDate" type="date" value={formData.employmentStartDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={3} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="default" onClick={handleSubmit}>
              Thêm
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateEmployee;
