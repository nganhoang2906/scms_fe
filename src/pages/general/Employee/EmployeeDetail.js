import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Paper, Typography, TextField, Grid, Button, Box,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const normalizeForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

  const normalizeForSave = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] === "" ? null : data[key];
    }
    return normalized;
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:8080/user/get-employee/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const normalizedData = normalizeForDisplay(res.data);

        if (normalizedData.avatarUrl) {
          normalizedData.avatarUrl = `${normalizedData.avatarUrl}?t=${Date.now()}`;
        }

        setEmployee(normalizedData);
        setEditedEmployee(normalizedData);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin nhân viên:", err);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:8080/user/update-employee/${employeeId}`,
        normalizeForSave(editedEmployee),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = normalizeForDisplay(res.data);
      setEmployee(updatedData);
      setEditedEmployee(updatedData);
      setIsEditing(false);
      alert("Cập nhật thông tin nhân viên thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      alert("Cập nhật thất bại!");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    const token = localStorage.getItem("token");

    formData.append("avatar", avatarFile);

    try {
      const res = await axios.put(
        `http://localhost:8080/user/update-avatar/${employeeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newAvatarUrl = res.data;
      const updatedAvatarUrl = `${newAvatarUrl}?${Date.now()}`;

      setEmployee((prev) => ({
        ...prev,
        avatarUrl: updatedAvatarUrl,
      }));

      setAvatarFile(null);
      setAvatarPreview(null);

      alert("Cập nhật avatar thành công!");
    } catch (err) {
      console.error("Lỗi khi upload avatar:", err);
      alert("Cập nhật avatar thất bại!");
    }
  };

  if (!employee) return null;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          THÔNG TIN NHÂN VIÊN
        </Typography>
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <img
            src={avatarPreview || employee.avatarUrl || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"}
            alt="avatar"
            style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }}
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <Button variant="outlined" component="label">
              Chọn ảnh
              <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </Button>
            <Button variant="contained" disabled={!avatarFile} onClick={handleUploadImage}>
              Cập nhật ảnh
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mã nhân viên" name="employeeCode" value={editedEmployee.employeeCode} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Họ và tên" name="employeeName" value={editedEmployee.employeeName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số điện thoại" name="phoneNumber" value={editedEmployee.phoneNumber} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" value={editedEmployee.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="date" label="Ngày sinh" name="dateOfBirth" InputLabelProps={{ shrink: true }} value={editedEmployee.dateOfBirth?.substring(0, 10)} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select name="gender" value={editedEmployee.gender || ''} label="Giới tính" onChange={handleChange}>
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Địa chỉ" name="address" value={editedEmployee.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Chức vụ" name="position" value={editedEmployee.position} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select name="status" value={editedEmployee.status || ''} label="Trạng thái" onChange={handleChange}>
                <MenuItem value="Đang làm việc">Đang làm việc</MenuItem>
                <MenuItem value="Đã nghỉ việc">Đã nghỉ việc</MenuItem>
                <MenuItem value="Tạm nghỉ">Tạm nghỉ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {isEditing && (
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="default" onClick={handleSave}>Lưu</Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>Hủy</Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EmployeeDetail;
