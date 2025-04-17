import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ItemForm from "@components/general/ItemForm";
import { getItemById, updateItem } from "@/services/general/ItemService";
import LoadingPaper from "@/components/content-components/LoadingPaper";

const EditItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
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
    const { itemName, itemType, uom, importPrice, exportPrice } = editedItem;

    if (!itemName?.trim()) errors.itemName = "Tên hàng hóa không được để trống";
    if (!itemType) errors.itemType = "Loại hàng hóa không được để trống";
    if (!uom) errors.uom = "Đơn vị tính không được để trống";

    if (importPrice && (isNaN(importPrice) || Number(importPrice) <= 0)) {
      errors.importPrice = "Giá nhập phải là số và lớn hơn 0 nếu nhập";
    }

    if (exportPrice && (isNaN(exportPrice) || Number(exportPrice) <= 0)) {
      errors.exportPrice = "Giá xuất phải là số và lớn hơn 0 nếu nhập";
    }

    return errors;
  };

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getItemById(itemId, token);
        const normalizedData = normalizeForDisplay(data);
        setItem(normalizedData);
        setEditedItem(normalizedData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin hàng hóa!");
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditedItem(item);
    navigate(`/item-detail/${itemId}`);
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await updateItem(itemId, normalizeForSave(editedItem), token);
      const updatedData = normalizeForDisplay(res);
      setItem(updatedData);
      setEditedItem(updatedData);
      alert("Cập nhật thông tin hàng hóa thành công!");
      navigate(`/item-detail/${itemId}`);
    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin hàng hóa!");
    }
  };

  if (!item) {
    return <LoadingPaper title="CHỈNH SỬA HÀNG HÓA" />;
  }

  const readOnlyFields = {
    itemCode: true,
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          CHỈNH SỬA HÀNG HÓA
        </Typography>

        <ItemForm
          item={editedItem}
          onChange={handleChange}
          errors={errors}
          readOnlyFields={readOnlyFields}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="default" onClick={handleSave}>
            Lưu
          </Button>
          <Button variant="outlined" color="default" onClick={handleCancel}>
            Hủy
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditItem;
