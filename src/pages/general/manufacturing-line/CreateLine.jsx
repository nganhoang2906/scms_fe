import React, { useState } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createLine } from "@services/general/ManufactureLineService";
import LineForm from "@components/general/LineForm";

const CreateLine = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [line, setLine] = useState({
    plantId: "",
    lineCode: "",
    lineName: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLine((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!line.plantId) newErrors.plantId = "Vui lòng chọn xưởng";
    if (!line.lineCode.trim()) newErrors.lineCode = "Mã dây chuyền không được để trống";
    if (!line.lineName.trim()) newErrors.lineName = "Tên dây chuyền không được để trống";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("Sending line:", line);
      await createLine(line.plantId, line, token);
      alert("Tạo dây chuyền thành công!");
      navigate("/line-in-company");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi tạo dây chuyền!");
    }
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          THÊM MỚI DÂY CHUYỀN
        </Typography>

        <LineForm
          line={line}
          onChange={handleChange}
          errors={errors}
          readOnlyFields={{}}
        />

        <Grid container spacing={2} justifyContent="flex-end" mt={2}>
          <Grid item>
            <Button variant="contained" color="default" onClick={handleSubmit}>
              Lưu
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="default" onClick={() => navigate("/line-in-company")}>
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateLine;
