import React from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const WarehouseForm = ({ warehouse, onChange, errors, readOnlyFields }) => {
  const isFieldReadOnly = (field) => readOnlyFields[field] ?? false;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Mã kho" name="warehouseCode" value={warehouse.warehouseCode} required 
        error={!!errors.warehouseCode} helperText={errors.warehouseCode} 
        InputProps={{ readOnly: isFieldReadOnly("warehouseCode") }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Tên kho" name="warehouseName" value={warehouse.warehouseName} required onChange={onChange} 
        error={!!errors.warehouseName} helperText={errors.warehouseName} 
        InputProps={{ readOnly: isFieldReadOnly("warehouseName") }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth type="number" label="Sức chứa tối đa" name="maxCapacity" value={warehouse.maxCapacity} onChange={onChange} 
        error={!!errors.maxCapacity} helperText={errors.maxCapacity} 
        InputProps={{ readOnly: isFieldReadOnly("maxCapacity") }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!!errors.warehouseType} helperText={errors.warehouseType} 
          InputProps={{ readOnly: isFieldReadOnly("maxCapacity") }}>
          <InputLabel>Loại kho</InputLabel>
          <Select name="warehouseType" value={warehouse.warehouseType || ""} label="Loại kho" onChange={onChange}>
            <MenuItem value="Nguyên liệu">Nguyên liệu</MenuItem>
            <MenuItem value="Thành phẩm">Thành phẩm</MenuItem>
            <MenuItem value="Hàng lỗi">Hàng lỗi</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth multiline rows={3} label="Mô tả" name="description" value={warehouse.description} onChange={onChange} 
        error={!!errors.description} helperText={errors.description} 
        InputProps={{ readOnly: isFieldReadOnly("description") }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!!errors.status} helperText={errors.status}
          InputProps={{ readOnly: isFieldReadOnly("status") }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select name="status" value={warehouse.status || ""} label="Trạng thái" onChange={onChange}>
            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
            <MenuItem value="Ngưng hoạt động">Ngừng hoạt động</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default WarehouseForm;
