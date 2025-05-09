import React from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ItemForm = ({ item, onChange, errors = {}, readOnlyFields }) => {
  const isFieldReadOnly = (field) => readOnlyFields?.[field] ?? false;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Mã hàng hóa" name="itemCode" value={item.itemCode} onChange={onChange}
          error={!!errors.itemCode} helperText={errors.itemCode} required
          InputProps={{ readOnly: isFieldReadOnly("itemCode") }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Tên hàng hóa" name="itemName" value={item.itemName} onChange={onChange}
          error={!!errors.itemName} helperText={errors.itemName} required
          InputProps={{ readOnly: isFieldReadOnly("itemName") }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth error={!!errors.itemType} helperText={errors.itemType} required >
          <InputLabel>Loại hàng hóa</InputLabel>
          <Select name="itemType" value={item.itemType || ''} label="Loại hàng hóa" onChange={onChange} 
            inputProps={{ readOnly: isFieldReadOnly("itemType") }}
          >
            <MenuItem value="Nguyên vật liệu">Nguyên vật liệu</MenuItem>
            <MenuItem value="Thành phẩm">Thành phẩm</MenuItem>
            <MenuItem value="Bán thành phẩm">Bán thành phẩm</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth error={!!errors.uom} helperText={errors.uom} required>
          <InputLabel>Đơn vị tính</InputLabel>
          <Select name="uom" value={item.uom || ''} label="Đơn vị tính" onChange={onChange} 
            inputProps={{ readOnly: isFieldReadOnly("uom") }}
          >
            <MenuItem value="bộ">bộ</MenuItem>
            <MenuItem value="chiếc">chiếc</MenuItem>
            <MenuItem value="pcs">pcs</MenuItem>
            <MenuItem value="g">g</MenuItem>
            <MenuItem value="m">m</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Giá nhập" name="importPrice" type="number" value={item.importPrice} onChange={onChange}
          error={!!errors.importPrice} helperText={errors.importPrice}
          InputProps={{ readOnly: isFieldReadOnly("importPrice") }}
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Giá xuất" name="exportPrice" type="number" value={item.exportPrice} onChange={onChange}
          error={!!errors.exportPrice} helperText={errors.exportPrice}
          InputProps={{ readOnly: isFieldReadOnly("exportPrice") }}
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Thông số kỹ thuật" name="technicalSpecifications" value={item.technicalSpecifications}
          onChange={onChange} multiline minRows={3}
          InputProps={{ readOnly: isFieldReadOnly("technicalSpecifications") }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Mô tả" name="description" value={item.description} onChange={onChange}
          multiline minRows={3} InputProps={{ readOnly: isFieldReadOnly("description") }}
        />
      </Grid>
    </Grid>
  );
};

export default ItemForm;
