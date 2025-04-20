import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createMo } from "@/services/manufacturing/MoService";
import { getAllItemsInCompany } from "@/services/general/ItemService";
import { getAllLinesInCompany } from "@/services/general/ManufactureLineService";
import MoForm from "@/components/manufacturing/MoForm";

const CreateMo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");
  const username = localStorage.getItem("username")

  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);
  const [lines, setLines] = useState([]);

  const [mo, setMo] = useState({
    moCode: "",
    itemId: "",
    itemCode: "",
    lineId: "",
    lineCode: "",
    type: "",
    quantity: "",
    estimatedStartTime: "",
    estimatedEndTime: "",
    createdBy: username,
    status: "Chờ xác nhận",
  });

  useEffect(() => {
    const fetchItemsAndLines = async () => {
      try {
        const itemsData = await getAllItemsInCompany(companyId, token);
        setItems(itemsData);

        const linesData = await getAllLinesInCompany(companyId, token);
        setLines(linesData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi khi lấy dữ liệu!");
      }
    };
    fetchItemsAndLines();
  }, [companyId, token]);

  const validateForm = () => {
    const formErrors = {};
    if (!mo.itemId) formErrors.itemCode = "Phải chọn sản phẩm";
    if (!mo.lineId) formErrors.lineCode = "Phải chọn dây chuyền sản xuất";
    if (!mo.type?.trim()) formErrors.type = "Loại không được để trống";
    if (mo.quantity === "" || mo.quantity <= 0) formErrors.quantity = "Số lượng phải > 0";
    if (!mo.status?.trim()) formErrors.status = "Trạng thái không được để trống";
    if (!mo.estimatedStartTime) formErrors.estimatedStartTime = "Phải chọn ngày bắt đầu dự kiến";
    if (!mo.estimatedEndTime) formErrors.estimatedEndTime = "Phải chọn ngày kết thúc dự kiến";
    if (mo.estimatedStartTime && mo.estimatedEndTime) {
      const start = new Date(mo.estimatedStartTime);
      const end = new Date(mo.estimatedEndTime);
      if (start >= end) {
        formErrors.estimatedEndTime = "Ngày kết thúc phải sau ngày bắt đầu";
      }
    }
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMo((prev) => ({ ...prev, [name]: value }));
  };

  const toISOStringWithTimezone = (localDateTimeString) => {
    if (!localDateTimeString) return null;
    const localDate = new Date(localDateTimeString);
    return localDate.toISOString();
  };
  

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const payload = {
        itemId: mo.itemId,
        lineId: mo.lineId,
        type: mo.type,
        quantity: mo.quantity,
        estimatedStartTime: toISOStringWithTimezone(mo.estimatedStartTime) || null,
        estimatedEndTime: toISOStringWithTimezone(mo.estimatedEndTime) || null,
        status: mo.status,
        createdBy: username,
      };

      console.log(mo.estimatedStartTime);

      await createMo(payload, token);
      alert("Tạo MO thành công!");
      navigate("/mo-in-company");
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || "Lỗi khi tạo MO!");
    }
  };

  const handleCancel = () => {
    navigate("/mo-in-company");
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          THÊM MỚI CÔNG LỆNH SẢN XUẤT
        </Typography>

        <MoForm
          mo={mo}
          onChange={handleChange}
          errors={errors}
          readOnlyFields={{ moCode: true, status:true }}
          setMo={setMo}
          items={items}
          lines={lines}
        />

        <Grid container spacing={2} mt={3} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="default" onClick={handleSubmit}>
              Thêm
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="default" onClick={handleCancel}>
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateMo;
