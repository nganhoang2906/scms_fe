import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import WarehouseForm from "@components/general/WarehouseForm";
import { getWarehouseById, updateWarehouse } from "@services/general/WarehouseService";

const EditWarehouse = () => {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [editedWarehouse, setEditedWarehouse] = useState(null);
  const [errors, setErrors] = useState({});

  const normalizeForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

  const normalizeForSave = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] === "" ? null : data[key];
    }
    return normalized;
  };

  const validateForm = () => {
    const errors = {};
    const { warehouseName, warehouseType, maxCapacity } = editedWarehouse;

    if (!warehouseName?.trim()) errors.warehouseName = "Tên kho không được để trống";
    if (!warehouseType) errors.warehouseType = "Loại kho không được để trống";
    if (maxCapacity == null || maxCapacity === "") errors.maxCapacity = "Sức chứa tối đa không được để trống";
    else if (isNaN(maxCapacity) || maxCapacity <= 0) errors.maxCapacity = "Sức chứa phải là số lớn hơn 0";

    return errors;
  };

  useEffect(() => {
    const fetchWarehouse = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getWarehouseById(warehouseId, token);
        const normalized = normalizeForDisplay(data);
        setWarehouse(normalized);
        setEditedWarehouse(normalized);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin kho!");
      }
    };

    fetchWarehouse();
  }, [warehouseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWarehouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditedWarehouse(warehouse);
    navigate(`/warehouse-detail/${warehouseId}`);
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await updateWarehouse(warehouseId, normalizeForSave(editedWarehouse), token);
      const updated = normalizeForDisplay(res);
      setWarehouse(updated);
      setEditedWarehouse(updated);
      alert("Cập nhật kho thành công!");
      navigate(`/warehouse-detail/${warehouseId}`);
    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật kho!");
    }
  };

  if (!warehouse) return null;

  const readOnlyFields = {
    warehouseCode: true,
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3} >
        <Typography className="page-title" variant="h4" >
          CHỈNH SỬA THÔNG TIN KHO HÀNG
        </Typography>

        <WarehouseForm warehouse={editedWarehouse} onChange={handleChange} errors={errors} readOnlyFields={readOnlyFields} />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="default" onClick={handleSave}>
            Lưu
          </Button>
          <Button variant="outlined" color="default" onClick={handleCancel}>
            Hủy
          </Button>
        </Box>
      </Paper>
    </Container >
  );
};

export default EditWarehouse;
