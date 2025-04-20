import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getStageByItemId, updateStage } from "@/services/manufacturing/StageService";
import StageForm from "@/components/manufacturing/StageForm";
import StageDetailTable from "@/components/manufacturing/StageDetailTable";
import LoadingPaper from "@/components/content-components/LoadingPaper";

const EditStage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stage, setStage] = useState(null);
  const [stageDetails, setStageDetails] = useState([]);
  const [errors, setErrors] = useState({ stageDetailErrors: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stageData = await getStageByItemId(itemId, token);
        setStage({
          ...stageData,
          stageCode: stageData.stageCode || "",
          stageName: stageData.stageName || "",
          description: stageData.description || "",
          status: stageData.status || "",
        });
        setStageDetails(stageData.stageDetails || []);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi khi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [itemId, token]);

  const validateForm = () => {
    const formErrors = {};
    if (!stage.stageCode) formErrors.stageCode = "Phải nhập mã công đoạn";
    if (!stage.stageName) formErrors.stageName = "Phải nhập tên công đoạn";
    if (!stage.status?.trim()) formErrors.status = "Trạng thái không được để trống";
    return formErrors;
  };

  const validateStageDetails = () => {
    const tableErrors = [];

    stageDetails.forEach((detail, index) => {
      if (!detail.stageName?.trim()) {
        tableErrors.push({ index, field: "stageName", message: "Tên công đoạn không được để trống" });
      }
      if (detail.estimatedTime < 0) {
        tableErrors.push({ index, field: "estimatedTime", message: ">= 0" });
      }
    });

    return tableErrors;
  };

  const readOnlyFields = {
    stageCode: true,
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
        description: stage.description,
        status: stage.status,
        stageDetailList: stageDetails.map((detail) => ({
          stageOrder: detail.stageOrder,
          stageName: detail.stageName,
          estimatedTime: detail.estimatedTime,
          description: detail.description,
        })),
      };

      await updateStage(stage.stageId, payload, token);
      alert("Cập nhật công đoạn thành công!");
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi cập nhật công đoạn!");
    }
  };

  const handleCancel = () => {
    navigate("/stage-in-company");
  };

  if (loading) {
    return <LoadingPaper title="CẬP NHẬT CÔNG ĐOẠN" />;
  }

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">CẬP NHẬT CÔNG ĐOẠN</Typography>

        <StageForm stage={stage} onChange={handleChange} errors={errors} readOnlyFields={readOnlyFields} setStage={setStage} />

        <StageDetailTable stageDetails={stageDetails} setStageDetails={setStageDetails} errors={errors.stageDetailErrors} />

        <Grid container spacing={2} mt={3} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="default" onClick={handleSubmit}>
              Lưu
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

export default EditStage;
