import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Paper, Typography, TextField, Grid, Button, Box,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";

const CompanyDetail = () => {
  const [company, setCompany] = useState(null);
  const [editedCompany, setEditedCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const normalizeCompanyForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

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

  const validateForm = () => {
    const errors = {};
  
    const { companyName, mainIndustry, representativeName, address, country, phoneNumber, email, startDate, joinDate, status } = editedCompany;
  
    if (!companyName.trim()) errors.companyName = "Tên công ty không được để trống";
    if (!address.trim()) errors.address = "Địa chỉ không được để trống";
    if (!country.trim()) errors.country = "Quốc gia không được để trống";
    if (!mainIndustry.trim()) errors.mainIndustry = "Ngành nghề chính không được để trống";
    if (!representativeName.trim()) errors.representativeName = "Người đại diện không được để trống";
    if (!phoneNumber.trim()) errors.phoneNumber = "Số điện thoại không được để trống";
    if (!/^\d{10,11}$/.test(phoneNumber)) errors.phoneNumber = "Số điện thoại không hợp lệ";
    if (!email.trim()) errors.email = "Email không được để trống";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email không hợp lệ";
    if (!startDate) errors.startDate = "Ngày bắt đầu không được để trống";
    if (!status) errors.status = "Trạng thái không được để trống";
    if (startDate && joinDate && new Date(startDate) > new Date(joinDate)) {
      errors.startDate = "Ngày bắt đầu phải trước ngày tham gia";
    }

  
    return errors;
  };  

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
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      const messages = Object.values(errors).join("\n");
      alert(`${messages}`);
      return;
    }
    
    const companyId = localStorage.getItem("companyId");
    const token = localStorage.getItem("token");

    try {
      const infoResponse = await axios.put(
        `http://localhost:8080/comsys/update-company/${companyId}`,
        normalizeCompanyForSave(editedCompany),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let updatedData = normalizeCompanyForDisplay(infoResponse.data);
      setCompany(updatedData);
      setEditedCompany(updatedData);
      setIsEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin công ty:", error);
      alert("Cập nhật thất bại!");
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadLogo = async () => {
    const companyId = localStorage.getItem("companyId");
    const formData = new FormData();
    const token = localStorage.getItem("token");
  
    formData.append("logo", logoFile);
  
    try {
      const res = await axios.put(
        `http://localhost:8080/comsys/update-company-logo/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const newLogoUrl = res.data;
      const updatedLogoUrl = `${newLogoUrl}?${Date.now()}`;
  
      setCompany((prev) => ({
        ...prev,
        logoUrl: updatedLogoUrl,
      }));
  
      setLogoFile(null);
      setLogoPreview(null);
  
      alert("Cập nhật logo thành công!");
    } catch (err) {
      console.error("Lỗi khi upload logo:", err);
      alert("Cập nhật logo thất bại!");
    }
  };
  
  if (!company) return null;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>Thông tin công ty</Typography>

        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <img
            src={logoPreview || company.logoUrl || "https://cdn-icons-png.freepik.com/512/2774/2774806.png"}
            alt=""
            style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <Button variant="outlined" color="default" component="label"> Chọn logo
              <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
            </Button>
            <Button variant="contained" color="default" disabled={!logoFile} onClick={handleUploadLogo}> Cập nhật logo </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Mã công ty *" name="companyCode" value={editedCompany.companyCode} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Tên công ty *" name="companyName" value={editedCompany.companyName} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Mã số thuế *" name="taxCode" value={editedCompany.taxCode} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Địa chỉ *" name="address" value={editedCompany.address} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Quốc gia *" name="country" value={editedCompany.country} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Loại hình doanh nghiệp</InputLabel>
              <Select name="companyType" value={editedCompany.companyType} label="Loại hình doanh nghiệp *" InputProps={{ readOnly: true }}>
                <MenuItem value="Doanh nghiệp sản xuất">Doanh nghiệp sản xuất</MenuItem>
                <MenuItem value="Doanh nghiệp thương mại">Doanh nghiệp thương mại</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Ngành nghề chính *" name="mainIndustry" value={editedCompany.mainIndustry} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Tên người đại diện *" name="representativeName" value={editedCompany.representativeName} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Số điện thoại *" name="phoneNumber" value={editedCompany.phoneNumber} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Email *" name="email" value={editedCompany.email} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Ngày bắt đầu *" name="startDate" InputLabelProps={{ shrink: true }} value={editedCompany.startDate?.substring(0, 10)} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Ngày tham gia *" name="joinDate" InputLabelProps={{ shrink: true }} value={editedCompany.joinDate?.substring(0, 10)} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Website" name="websiteAddress" value={editedCompany.websiteAddress} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select name="status" value={editedCompany.status} label="Trạng thái *" onChange={handleChange}>
                <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
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

export default CompanyDetail;
