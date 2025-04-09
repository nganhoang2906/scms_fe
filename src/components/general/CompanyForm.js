import React from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CompanyForm = ({ companyData, onChange, errors }) => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Mã công ty" name="companyCode" value={companyData.companyCode} InputProps={{ readOnly: true }}/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Tên công ty" name="companyName" value={companyData.companyName} error={!!errors.companyName} helperText={errors.companyName} onChange={onChange} required/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Mã số thuế" name="taxCode" value={companyData.taxCode} error={!!errors.taxCode} helperText={errors.taxCode} InputProps={{ readOnly: true }} required/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Tên người đại diện" name="representativeName" value={companyData.representativeName} error={!!errors.representativeName} helperText={errors.representativeName} onChange={onChange} required/></Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Loại hình doanh nghiệp</InputLabel>
          <Select name="companyType" value={companyData.companyType} label="Loại hình doanh nghiệp" disabled required>
            <MenuItem value="Doanh nghiệp sản xuất">Doanh nghiệp sản xuất</MenuItem>
            <MenuItem value="Doanh nghiệp thương mại">Doanh nghiệp thương mại</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Ngành nghề chính" name="mainIndustry" value={companyData.mainIndustry} onChange={onChange}/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Địa chỉ" name="address" value={companyData.address} error={!!errors.address} helperText={errors.address} onChange={onChange} required/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Quốc gia" name="country" value={companyData.country} error={!!errors.country} helperText={errors.country} onChange={onChange} required/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Số điện thoại" name="phoneNumber" value={companyData.phoneNumber} error={!!errors.phoneNumber} helperText={errors.phoneNumber} onChange={onChange} required/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={companyData.email} onChange={onChange} error={!!errors.email} helperText={errors.email} required/></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Ngày bắt đầu" name="startDate" InputLabelProps={{ shrink: true }} error={!!errors.startDate} helperText={errors.startDate} value={companyData.startDate?.substring(0, 10)} onChange={onChange} /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Ngày tham gia" name="joinDate" InputLabelProps={{ shrink: true }} value={companyData.joinDate?.substring(0, 10)} InputProps={{ readOnly: true }} /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Website" name="websiteAddress" value={companyData.websiteAddress} onChange={onChange} /></Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel required>Trạng thái</InputLabel>
          <Select name="status" value={companyData.status} label="Trạng thái" onChange={onChange}>
            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
            <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CompanyForm;
