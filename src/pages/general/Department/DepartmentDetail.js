import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Paper, Typography, TextField, Grid, Button, Box,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";

const DepartmentDetail = () => {
  const [company, setCompany] = useState(null);
  const [editedCompany, setEditedCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Chuyển đổi null thành chuỗi rỗng khi hiển thị
  const normalizeCompanyForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";  // Chuyển null thành chuỗi rỗng
    }
    return normalized;
  };

  // Chuyển đổi chuỗi rỗng thành null khi lưu
  const normalizeCompanyForSave = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] === "" ? null : data[key];
    }
    return normalized;
  };

  useEffect(() => {
    const fetchCompany = async () => {
      const companyId = localStorage.getItem("companyId");
      if (!companyId) return;
      try {
        const response = await axios.get(`http://localhost:8080/auth/get-company/${companyId}`);
        const normalizedData = normalizeCompanyForDisplay(response.data);
        setCompany(normalizedData);
        setEditedCompany(normalizedData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin công ty:", error);
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({ ...prev, [name]: value }));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedCompany(company);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const companyId = localStorage.getItem("companyId");
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    console.log("Company ID:", companyId);

    try {
      // Cập nhật thông tin công ty
      const infoResponse = await axios.put(
        `http://localhost:8080/comsys/update-company/${companyId}`,
        normalizeCompanyForSave(editedCompany), // Dữ liệu sẽ được chuẩn hóa trước khi gửi
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let updatedData = normalizeCompanyForDisplay(infoResponse.data); // Chuẩn hóa lại dữ liệu sau khi nhận phản hồi

      setCompany(updatedData);
      setEditedCompany(updatedData);
      setIsEditing(false);
      alert("Cập nhật thông tin thành công!");

    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin công ty:", error);
      alert("Cập nhật thất bại!");
    }
  };

  if (!editedCompany) return null;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Thông tin công ty</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Mã công ty" name="companyCode" value={editedCompany.companyCode} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Tên công ty" name="companyName" value={editedCompany.companyName} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Mã số thuế" name="taxCode" value={editedCompany.taxCode} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Địa chỉ" name="address" value={editedCompany.address} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Quốc gia" name="country" value={editedCompany.country} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Loại hình doanh nghiệp" name="companyType" value={editedCompany.companyType} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Ngành nghề chính" name="mainIndustry" value={editedCompany.mainIndustry} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Tên người đại diện" name="representativeName" value={editedCompany.representativeName} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Số điện thoại" name="phoneNumber" value={editedCompany.phoneNumber} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={editedCompany.email} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Website" name="websiteAddress" value={editedCompany.websiteAddress} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Ngày bắt đầu" name="startDate" InputLabelProps={{ shrink: true }} value={editedCompany.startDate?.substring(0, 10)} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Ngày tham gia" name="joinDate" InputLabelProps={{ shrink: true }} value={editedCompany.joinDate?.substring(0, 10)} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select name="status" value={editedCompany.status} label="Trạng thái" onChange={handleChange}>
                <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Nút Lưu / Hủy */}
        {isEditing && (
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>Lưu</Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>Hủy</Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default DepartmentDetail;
