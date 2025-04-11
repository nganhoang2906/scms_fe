import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import WarehouseForm from "@components/general/WarehouseForm";
import { getWarehouseById } from "@services/general/WarehouseService";

const WarehouseDetail = () => {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const navigate = useNavigate();

  const normalizeForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

  useEffect(() => {
    const fetchWarehouse = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getWarehouseById(warehouseId, token);
        const normalizedData = normalizeForDisplay(data);
        setWarehouse(normalizedData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin kho!");
      }
    };

    fetchWarehouse();
  }, [warehouseId]);

  if (!warehouse) return null;

  const readOnlyFields = {
    warehouseCode: true,
    warehouseName: true,
    maxCapacity: true,
    warehouseType: true,
    description: true,
    status: true,
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3} >
        <Typography className="page-title" variant="h4" >
          THÔNG TIN KHO HÀNG
        </Typography>

        <WarehouseForm warehouse={warehouse} onChange={() => { }} errors={{}} readOnlyFields={readOnlyFields} />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="default" onClick={() => navigate(`/warehouse/${warehouseId}/edit`)} >
            Sửa
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WarehouseDetail;
