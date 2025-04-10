import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Grid, TextField } from "@mui/material";
import { getDepartmentById } from "@services/general/DepartmentService";

const DepartmentDetail = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await getDepartmentById(departmentId, token);
        console.log(data);
        setDepartment(data);
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi lấy thông tin phòng ban");
      }
    };
  
    if (departmentId && token) {
      fetchDepartment();
    }
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
          <Grid item xs={12} sm={6}><TextField fullWidth label="Mã phòng ban *" name="departmentCode" value={department.departmentCode} readOnly /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Tên phòng ban *" name="departmentName" value={department.departmentName} readOnly /></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DepartmentDetail;
