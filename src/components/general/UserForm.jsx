import React from "react";
import {
  Grid, TextField, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

const UserForm = ({ user, onChange, errors, role }) => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {role === "c-admin" && (
          <TextField fullWidth label="Mã nhân viên" name="employeeCode" value={user.employeeCode} required readOnly error={!!errors.employeeCode} helperText={errors.employeeCode} />
        )}
        {role === "s-admin" && (
          <TextField fullWidth label="Username" name="username" value={user.username} required readOnly onChange={onChange} error={!!errors.username} helperText={errors.username} />
        )}
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Email" name="email" value={user.email} required onChange={onChange} error={!!errors.email} helperText={errors.email} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Vai trò</InputLabel>
          <Select name="role" value={user.role || ""}
            label="Vai trò" onChange={onChange}
          >
            {role === "s-admin" && (
              <MenuItem value="S-ADMIN">S-ADMIN</MenuItem>
            )}
            <MenuItem value="C-ADMIN">C-ADMIN</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Trạng thái</InputLabel>
          <Select name="status" value={user.status || ""}
            label="Trạng thái" onChange={onChange}
          >
            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
            <MenuItem value="Đã bị khóa">Đã bị khóa</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default UserForm;
