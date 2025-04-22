import React, { useState } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createStage } from "@/services/manufacturing/StageService";
import StageForm from "@/components/manufacturing/StageForm";
import StageDetailTable from "@/components/manufacturing/StageDetailTable";

const CreateStage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  const [errors, setErrors] = useState({ stageDetailErrors: [] });
  const [stageDetails, setStageDetails] = useState([]);

  const [stage, setStage] = useState({
    companyId,
    stageCode: "",
    itemId: "",
    itemCode: "",
    itemName: "",
    description: "",
    status: "",
  });

  const validateForm = () => {
    const formErrors = {};
    if (!stage.itemCode) formErrors.itemCode = "Phải chọn hàng hóa";
    if (!stage.itemName) formErrors.itemName = "Chưa có tên hàng hóa";
    if (!stage.status?.trim()) formErrors.status = "Trạng thái không được để trống";
    return formErrors;
  };

  const validateStageDetails = () => {
    const tableErrors = [];

    stageDetails.forEach((detail, index) => {
      if (!detail.stageName?.trim()) {
        tableErrors.push({ index, field: "stageName", message: "Phải nhập tên công đoạn" });
      }
      if (detail.estimatedTime < 0) {
        tableErrors.push({ index, field: "estimatedTime", message: ">= 0" });
      }
    });

    return tableErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    const stageDetailErrors = validateStageDetails();

    if (Object.keys(validationErrors).length > 0 || stageDetailErrors.length > 0) {
      setErrors({ ...validationErrors, stageDetailErrors });
      return;
    }

    try {
      const payload = {
        itemId: stage.itemId,
        description: stage.description,
        status: stage.status,
        stageDetails: stageDetails.map((detail) => ({
          stageName: detail.stageName,
          stageOrder: detail.stageOrder,
          estimatedTime: detail.estimatedTime,
          description: detail.description,
        })),
      };

      await createStage(payload, token);
      alert("Tạo Stage thành công!");
      navigate("/stage-in-company");
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || "Lỗi khi tạo Stage!");
    }
  };

  const handleCancel = () => {
    navigate("/stage-in-company");
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          THÊM MỚI STAGE
        </Typography>

        <StageForm
          stage={stage}
          onChange={handleChange}
          errors={errors}
          readOnlyFields={{ stageCode: true }}
          setStage={setStage}
        />

        <StageDetailTable
          stageDetails={stageDetails}
          setStageDetails={setStageDetails}
          errors={errors.stageDetailErrors}
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

export default CreateStage;
