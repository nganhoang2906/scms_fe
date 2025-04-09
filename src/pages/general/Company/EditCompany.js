import React, { useEffect, useState, } from "react";
import { Container, Paper, Typography, Grid, Button, Box, } from "@mui/material";
import { getCompanyById, updateCompany, updateCompanyLogo } from "../../../services/general/CompanyService";
import CompanyForm from "../../../components/general/CompanyForm";
import { useNavigate } from "react-router-dom";

const EditCompany = () => {
  const [company, setCompany] = useState(null);
  const [editedCompany, setEditedCompany] = useState(null);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const navigate = useNavigate();

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
        const data = await getCompanyById(companyId);
        const normalizedData = normalizeCompanyForDisplay(data);

        if (normalizedData.logoUrl) {
          normalizedData.logoUrl = `${normalizedData.logoUrl}?t=${Date.now()}`;
        }

        setCompany(normalizedData);
        setEditedCompany(normalizedData);
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi lấy thông tin công ty!");
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
  };

  const handleCancel = () => {
    setEditedCompany(company);
    navigate("/company-detail");
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join("\n"));
      return;
    }

    const companyId = localStorage.getItem("companyId");
    const token = localStorage.getItem("token");

    try {
      await updateCompany(companyId, normalizeCompanyForSave(editedCompany), token);

      const refreshed = await getCompanyById(companyId);
      const normalizedRefreshed = normalizeCompanyForDisplay(refreshed);

      setCompany(normalizedRefreshed);
      setEditedCompany(normalizedRefreshed);
      alert("Cập nhật thông tin thành công!");
      navigate("/company-detail");

    } catch (error) {
      alert(error.response?.data?.message || "Cập nhật thất bại!");
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
    const token = localStorage.getItem("token");

    try {
      const newLogoUrl = await updateCompanyLogo(companyId, logoFile, token);
      const updatedLogoUrl = `${newLogoUrl}?${Date.now()}`;
      setCompany((prev) => ({ ...prev, logoUrl: updatedLogoUrl }));
      setLogoFile(null);
      setLogoPreview(null);
      alert("Cập nhật logo thành công!");
    } catch (error) {
      alert(error.response?.data?.message || "Cập nhật logo thất bại!");
    }
  };

  if (!company) return null;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          THÔNG TIN CÔNG TY
        </Typography>
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Box mb={3}>
            <img
              src={logoPreview || company.logoUrl || "https://cdn-icons-png.freepik.com/512/2774/2774806.png"}
              alt=""
              style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Button variant="outlined" color="default" component="label"> Chọn logo
              <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
            </Button>
            <Button variant="contained" color="default" disabled={!logoFile} onClick={handleUploadLogo}> Cập nhật logo </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <CompanyForm
            companyData={editedCompany}
            onChange={handleChange}
          />
        </Grid>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="default" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>Hủy</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditCompany;
