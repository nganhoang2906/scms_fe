import React, { useEffect, useState } from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { getAllItemsInCompany } from "@/services/general/ItemService";
import SelectAutocomplete from "@components/content-components/SelectAutocomplete";

const StageForm = ({ stage, onChange, errors = {}, readOnlyFields, setStage }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  const isFieldReadOnly = (field) => readOnlyFields?.[field] ?? false;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItemsInCompany(companyId, token);
        const filtered = data.filter(
          (item) => item.itemType === "Thành phẩm" || item.itemType === "Bán thành phẩm"
        );

        if (stage?.itemCode && !filtered.some(item => item.itemCode === stage.itemCode)) {
          filtered.unshift({
            itemCode: stage.itemCode,
            itemName: stage.itemName,
            itemId: stage.itemId,
          });
        }

        setItems(filtered);
        setFilteredItems(filtered);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi khi lấy mặt hàng!");
      }
    };
    fetchItems();
  }, [companyId, token, stage]);

  const handleItemCodeChange = (value) => {
    const selectedItem = items.find((item) => item.itemCode === value);
    setStage((prev) => ({
      ...prev,
      itemCode: value || "",
      itemName: selectedItem ? selectedItem.itemName : "",
      itemId: selectedItem ? selectedItem.itemId : "",
    }));
  };

  const handleSearchInputChange = (value) => {
    const filtered = items
      .filter((item) => item.itemCode.toLowerCase().includes(value.toLowerCase()))
    setFilteredItems(filtered);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Mã Stage" name="stageCode" value={stage.stageCode} onChange={onChange}
          placeholder="Mã Stage được tạo tự động" required
          inputProps={{ readOnly: isFieldReadOnly("stageCode") }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SelectAutocomplete
          options={filteredItems.map(item => ({ label: item.itemCode, value: item.itemCode }))}
          value={stage.itemCode}
          onChange={(selected) => handleItemCodeChange(selected?.value || "")}
          onInputChange={handleSearchInputChange}
          placeholder="Chọn hàng hóa"
          error={errors.itemCode}
          helperText={errors.itemCode}
          size="small"
          disabled={isFieldReadOnly("itemCode")}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Tên hàng hóa" name="itemName" value={stage.itemName} onChange={onChange}
          required error={!!errors.itemName} helperText={errors.itemName}
          InputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!!errors.status}>
          <InputLabel>Trạng thái</InputLabel>
          <Select name="status" value={stage.status || ''} label="Trạng thái" onChange={onChange} inputProps={{ readOnly: isFieldReadOnly("status") }} >
            <MenuItem value="Đang sử dụng">Đang sử dụng</MenuItem>
            <MenuItem value="Ngừng sử dụng">Ngừng sử dụng</MenuItem>
          </Select>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Mô tả" name="description" value={stage.description}
          onChange={onChange} multiline minRows={3}
          InputProps={{ readOnly: isFieldReadOnly("description") }}
        />
      </Grid>
    </Grid>
  );
};

export default StageForm;
