import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, MenuItem, Button, Grid, Paper, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllDepartmentsInCompany } from "../../../services/general/DepartmentService";
import { createEmployee } from "../../../services/general/EmployeeService";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    employeeCode: "",
    employeeName: "",
    position: "",
    gender: "",
    identityNumber: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
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
            <TextField select fullWidth label="Phòng ban *" name="departmentId" value={formData.departmentId} onChange={handleChange}>
              {departments.map((dept) => (
                <MenuItem key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Chức vụ *" name="position" value={formData.position} onChange={handleChange}>
              <MenuItem value="Quản lý">Quản lý</MenuItem>
              <MenuItem value="Nhân viên">Nhân viên</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mã nhân viên *" name="employeeCode" value={formData.employeeCode} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Họ tên *" name="employeeName" value={formData.employeeName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số CCCD *" name="identityNumber" value={formData.identityNumber} onChange={handleChange} />
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
            <TextField fullWidth label="Email *" name="email" value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số điện thoại *" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Tên đăng nhập *" name="username" value={formData.username} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mật khẩu *" name="password" type="password" value={formData.password} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Ngày bắt đầu làm *" name="employmentStartDate" type="date" value={formData.employmentStartDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
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
