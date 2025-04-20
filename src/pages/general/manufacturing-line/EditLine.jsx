import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LineForm from "@components/general/LineForm";
import { getLineById, updateLine } from "@/services/general/ManufactureLineService";
import LoadingPaper from "@/components/content-components/LoadingPaper";

const EditLine = () => {
  const { lineId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [line, setLine] = useState(null);
  const [editedLine, setEditedLine] = useState(null);
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
    const { lineName, lineCode, plantId } = editedLine;

    if (!plantId) errors.plantId = "Vui lòng chọn xưởng";
    if (!lineName?.trim()) errors.lineName = "Tên dây chuyền không được để trống";
    if (!lineCode?.trim()) errors.lineCode = "Mã dây chuyền không được để trống";

    return errors;
  };

  useEffect(() => {
    const fetchLineById = async () => {
      try {
        const data = await getLineById(lineId, token);
        const normalized = normalizeForDisplay(data);
        setLine(normalized);
        setEditedLine(normalized);
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi lấy thông tin dây chuyền!");
      }
    };
  
    fetchLineById();
  }, [lineId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLine((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditedLine(line);
    navigate(`/line/${lineId}`);
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedLine = await updateLine(lineId, normalizeForSave(editedLine), token);
      const normalized = normalizeForDisplay(updatedLine);
      setLine(normalized);
      setEditedLine(normalized);
      alert("Cập nhật dây chuyền thành công!");
      navigate(`/line/${lineId}`);
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi cập nhật dây chuyền!");
    }
  };

  const readOnlyFields = {
    lineCode: true,
  };

  if (!line) {
    return <LoadingPaper title="CHỈNH SỬA THÔNG TIN DÂY CHUYỀN" />;
  }

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          CHỈNH SỬA THÔNG TIN DÂY CHUYỀN
        </Typography>

        <LineForm
          line={editedLine}
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

export default EditLine;
