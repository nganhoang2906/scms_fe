import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Grid, TextField } from "@mui/material";

const DepartmentDetail = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/get-department/${departmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setDepartment(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phòng ban:", error);
      }
    };

    fetchDepartment();
  }, [departmentId, token]);

  if (!department) {
    return (
      <Container>
        <Typography variant="h6" mt={4}>Đang tải thông tin phòng ban...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom  sx={{ p: 2}}>
          THÔNG TIN PHÒNG BAN
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Mã phòng ban *" name="departmentCode" value={department.departmentCode} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Tên phòng ban *" name="departmentId" value={department.departmentId} InputProps={{ readOnly: true }} /></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DepartmentDetail;
