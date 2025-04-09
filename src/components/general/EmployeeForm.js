import React from "react";
import {
  Grid, TextField, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

const EmployeeForm = ({ employee, onChange, errors }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Phòng ban" name="departmentId" value={employee.departmentId} required onChange={onChange} InputProps={{ readOnly: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Chức vụ</InputLabel>
          <Select name="position" value={employee.position || ''} label="Chức vụ" onChange={onChange}>
            <MenuItem value="Quản lý">Quản lý</MenuItem>
            <MenuItem value="Nhân viên">Nhân viên</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Mã nhân viên" name="employeeCode" value={employee.employeeCode} required InputProps={{ readOnly: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Họ và tên" name="employeeName" value={employee.employeeName} error={!!errors.employeeName} helperText={errors.employeeName} required onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth type="date" label="Ngày sinh" name="dateOfBirth"
          InputLabelProps={{ shrink: true }}
          value={employee.dateOfBirth?.substring(0, 10)} onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Giới tính</InputLabel>
          <Select name="gender" value={employee.gender || ''} label="Giới tính" onChange={onChange}>
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Địa chỉ" name="address" value={employee.address} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Số điện thoại" name="phoneNumber" value={employee.phoneNumber} error={!!errors.phoneNumber} helperText={errors.phoneNumber} required onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Email" name="email" value={employee.email} error={!!errors.email} helperText={errors.email} required onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel required>Trạng thái</InputLabel>
          <Select name="status" value={employee.status || ''} label="Trạng thái" onChange={onChange}>
            <MenuItem value="Đang làm việc">Đang làm việc</MenuItem>
            <MenuItem value="Đã nghỉ việc">Đã nghỉ việc</MenuItem>
            <MenuItem value="Tạm nghỉ">Tạm nghỉ</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
