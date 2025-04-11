import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import PlantForm from "@components/general/PlantForm";
import { getPlantById } from "@services/general/ManufacturePlantService";

const PlantDetail = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const navigate = useNavigate();

  const normalizeForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

  useEffect(() => {
    const fetchPlant = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getPlantById(plantId, token);
        const normalizedData = normalizeForDisplay(data);
        setPlant(normalizedData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin xưởng!");
      }
    };

    fetchPlant();
  }, [plantId]);

  if (!plant) return null;

  const readOnlyFields = {
    plantCode: true,
    plantName: true,
    description: true,
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          THÔNG TIN XƯỞNG SẢN XUẤT
        </Typography>

        <PlantForm plant={plant} onChange={() => { }} errors={{}} readOnlyFields={readOnlyFields} />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="default" onClick={() => navigate(`/plant/${plantId}/edit`)}>
            Sửa
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PlantDetail;
