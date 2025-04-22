import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button, Grid, FormControl, InputLabel, Select, MenuItem, TableRow, TableCell } from "@mui/material";
import DataTable from "@components/content-components/DataTable";
import { getAllInventory, checkInventory, increaseOnDemand } from "@/services/inventory/InventoryService";
import { getBomByItemId } from "@/services/manufacturing/BomService";
import { getAllWarehousesInCompany } from "@/services/general/WarehouseService";
import { getMoById, updateMo } from "@/services/manufacturing/MoService";
import { useNavigate, useParams } from "react-router-dom";

const CheckInventory = () => {
  const [bomDetails, setBomDetails] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");
  const [inventoryResults, setInventoryResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");
  const navigate = useNavigate();
  const { type, id } = useParams();

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const data = await getAllWarehousesInCompany(companyId, token);
        setWarehouses(data);
      } catch (error) {
        alert(error.response?.data?.message || "Không thể tải danh sách kho!");
      }
    };

    fetchWarehouses();
  }, [companyId, token]);

  useEffect(() => {
    const fetchDataByType = async () => {
      try {
        if (type === "mo") {
          const mo = await getMoById(id, token);
          setQuantity(mo.quantity);

          const bom = await getBomByItemId(mo.itemId, token);
          setBomDetails(bom.bomDetails);
        }
      } catch (error) {
        alert(error.response?.data?.message || "Không thể tải dữ liệu!");
      }
    };

    fetchDataByType();
  }, [type, id, token]);

  const handleWarehouseChange = (e) => {
    setSelectedWarehouseId(e.target.value);
  };

  const handleCheckInventory = async () => {
    if (!selectedWarehouseId) {
      alert("Vui lòng chọn kho!");
      return;
    }

    setLoading(true);
    try {
      const results = await Promise.all(
        bomDetails.map(async (detail) => {
          const inventories = await getAllInventory(detail.itemId, selectedWarehouseId, companyId, token);
          const availableQty = (inventories[0]?.quantity - inventories[0].onDemandQuantity) || 0;
          const amountNeeded = detail.quantity * quantity;
          const check = await checkInventory(detail.itemId, selectedWarehouseId, amountNeeded, token);
          return {
            ...detail,
            quantityNeeded: amountNeeded,
            available: availableQty,
            enough: check,
          };
        })
      );

      setInventoryResults(results);
      console.log(results);
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi tải tồn kho!");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (inventoryResults.length === 0) {
      alert("Vui lòng kiểm tra tồn kho trước!");
      return;
    }

    try {
      const allEnough = inventoryResults.every((r) => r.enough);
      if (allEnough) {
        await Promise.all(
          inventoryResults.map(async (r) => {
            const inventories = await getAllInventory(r.itemId, selectedWarehouseId, companyId, token);
            if (inventories.length > 0) {
              await increaseOnDemand(inventories[0].inventoryId, r.quantityNeeded, token);
            }
          })
        );

        if (type === "mo") {
          const mo = await getMoById(id, token);
  
          const updatedMo = { ...mo, status: "Chờ sản xuất" };
          await updateMo(id, updatedMo, token);
        }

        navigate(-1);
      } else {
        alert("Có nguyên liệu không đủ số lượng!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi kiểm tra tồn kho!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { id: "itemCode", label: "Mã hàng hóa" },
    { id: "itemName", label: "Tên hàng hóa" },
    { id: "quantityNeeded", label: "Số lượng cần" },
    { id: "available", label: "Tồn kho sẵn có" },
    { id: "enough", label: "Đủ hàng", format: (value) => (value === null ? "⏳" : value ? "✔️" : "❌") },
  ];

  return (
    <Container>
      <Paper elevation={3} className="paper-container">
        <Typography variant="h4" className="page-title">
          Kiểm tra tồn kho
        </Typography>

        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Kho xuất</InputLabel>
                <Select value={selectedWarehouseId} onChange={handleWarehouseChange} label="Kho xuất">
                  {warehouses.map((wh) => (
                    <MenuItem key={wh.warehouseId} value={wh.warehouseId}>
                      {wh.warehouseCode} - {wh.warehouseName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="default" onClick={handleCheckInventory} disabled={!selectedWarehouseId || loading}>
                Kiểm tra tồn kho
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <DataTable
            rows={inventoryResults}
            columns={columns}
            order="asc"
            orderBy=""
            onRequestSort={() => { }}
            page={1}
            rowsPerPage={inventoryResults.length}
            onPageChange={() => { }}
            onRowsPerPageChange={() => { }}
            search=""
            setSearch={() => { }}
            renderRow={(row) => (
              <TableRow key={row.itemId}>
                <TableCell>{row.itemCode}</TableCell>
                <TableCell>{row.itemName}</TableCell>
                <TableCell>{row.quantityNeeded}</TableCell>
                <TableCell>{row.available}</TableCell>
                <TableCell>{row.enough === null ? "⏳" : row.enough ? "✔️" : "❌"}</TableCell>
              </TableRow>
            )}
          />
        </Box>

        {inventoryResults.length > 0 && (
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="default" onClick={handleConfirm} disabled={loading}>
              Xác nhận
            </Button>
            <Button variant="outlined" color="default" onClick={() => navigate(-1)}>
              Hủy
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CheckInventory;
