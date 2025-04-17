import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Grid, TextField } from "@mui/material";
import { getDepartmentById } from "@/services/general/DepartmentService";
import LoadingPaper from "@/components/content-components/LoadingPaper";

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
        alert(error.response?.data?.message || "Lỗi khi lấy thông tin bộ phận");
      }
    };

    if (departmentId && token) {
      fetchDepartment();
    }
  }, [departmentId, token]);

  if (!department) {
    return <LoadingPaper title="THÔNG TIN BỘ PHẬN" />;
  }

  return (
    <Container>
      <Paper className="paper-container" elevation={3} >
        <Typography className="page-title" variant="h4" >
          THÔNG TIN BỘ PHẬN
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Mã bộ phận *" name="departmentCode" value={department.departmentCode} readOnly /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Tên bộ phận *" name="departmentName" value={department.departmentName} readOnly /></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DepartmentDetail;
