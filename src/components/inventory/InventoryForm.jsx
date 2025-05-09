import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import SelectAutocomplete from "../content-components/SelectAutocomplete";
import { getAllItemsInCompany } from "@/services/general/ItemService";
import { getAllWarehousesInCompany } from "@/services/general/WarehouseService";

const InventoryForm = ({ inventory, onChange, setInventory, errors }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = await getAllItemsInCompany(companyId, token);
        setItems(itemsData);

        const warehousesData = await getAllWarehousesInCompany(companyId, token);
        setWarehouses(warehousesData);
      } catch (error) {
        alert(error?.response?.data?.message || "Có lỗi khi tải dữ liệu!");
      }
    };
    fetchData();
  }, [companyId, token]);
  
  const handleSelectWarehouse = (e) => {
    const selected = warehouses.find((wh) => wh.warehouseCode === e.target.value);
    setInventory((prev) => ({
      ...prev,
      warehouseId: selected?.warehouseId || "",
      warehouseCode: selected?.warehouseCode || "",
    }));
  };

  const handleSelectItem = (e) => {
    const selected = items.find((item) => item.itemCode === e.target.value);
    setInventory((prev) => ({
      ...prev,
      itemId: selected?.itemId || "",
      itemCode: selected?.itemCode || "",
    }));
  };

  const handleItemSearchChange = (value) => {
    const filtered = items
      .filter((item) => item.itemCode.toLowerCase().includes(value.toLowerCase()))
    setFilteredItems(filtered);
  };

  const handleWarehouseSearchChange = (value) => {
    const filtered = warehouses
      .filter((warehouse) => warehouse.warehouseCode.toLowerCase().includes(value.toLowerCase()))
    setFilteredWarehouses(filtered);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12} sm={6}>
        <SelectAutocomplete
          options={filteredWarehouses.map(wh => ({ label: wh.warehouseCode, value: wh.warehouseCode }))}
          value={inventory.warehouseCode}
          onChange={(selected) => handleSelectWarehouse({ target: { value: selected?.value || "" } })}
          onInputChange={handleWarehouseSearchChange}
          placeholder="Chọn kho"
          error={errors.warehouseCode}
          helperText={errors.warehouseCode}
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SelectAutocomplete
          options={filteredItems.map(item => ({ label: item.itemCode, value: item.itemCode }))}
          value={inventory.itemCode}
          onChange={(selected) => handleSelectItem(selected?.value || "")}
          onInputChange={handleItemSearchChange}
          placeholder="Chọn hàng hóa"
          error={errors.itemCode}
          helperText={errors.itemCode}
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="number"
          name="quantity"
          label="Số lượng tồn kho"
          value={inventory.quantity}
          onChange={onChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="number"
          name="onDemandQuantity"
          label="Số lượng cần dùng"
          value={inventory.onDemandQuantity}
          onChange={onChange}
          error={!!errors.onDemandQuantity}
          helperText={errors.onDemandQuantity}
          inputProps={{ min: 0 }}
        />
      </Grid>
    </Grid>
  );
};

export default InventoryForm;
