import React, { useState } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createWarehouse } from "@/services/general/WarehouseService";
import WarehouseForm from "@components/general/WarehouseForm";

const CreateWarehouse = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  const [warehouse, setWarehouse] = useState({
    companyId,
    warehouseCode: "",
    warehouseName: "",
    description: "",
    maxCapacity: "",
    warehouseType: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarehouse((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!warehouse.warehouseCode.trim()) newErrors.warehouseCode = "Mã kho không được để trống";
    if (!warehouse.warehouseName.trim()) newErrors.warehouseName = "Tên kho không được để trống";
    if (!warehouse.maxCapacity || warehouse.maxCapacity <= 0) newErrors.maxCapacity = "Sức chứa phải lớn hơn 0";
    if (!warehouse.warehouseType) newErrors.warehouseType = "Loại kho không được để trống";
    if (!warehouse.status) newErrors.status = "Trạng thái không được để trống";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createWarehouse(companyId, warehouse, token);
      alert("Tạo kho hàng thành công!");
      navigate("/warehouse-in-company");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi tạo kho!");
    }
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3} >
        <Typography className="page-title" variant="h4" >
          THÊM MỚI KHO HÀNG
        </Typography>

        <WarehouseForm warehouse={warehouse} onChange={handleChange} errors={errors} readOnlyFields={{}} />

        <Grid container spacing={2} justifyContent="flex-end" mt={2}>
          <Grid item>
            <Button variant="contained" color="default" onClick={handleSubmit}>Lưu</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="default" onClick={() => navigate("/warehouse-in-company")}>Hủy</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateWarehouse;
