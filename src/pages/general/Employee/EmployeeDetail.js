import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../../../components/general/EmployeeForm";
import { getEmployeeById, deleteEmployee } from "../../../services/general/EmployeeService";

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  const normalizeForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getEmployeeById(employeeId, token);
        const normalizedData = normalizeForDisplay(data);
        if (normalizedData.avatarUrl) {
          normalizedData.avatarUrl = `${normalizedData.avatarUrl}?t=${Date.now()}`;
        }
        setEmployee(normalizedData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin nhân viên!");
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa nhân viên này không?")) return;

    const token = localStorage.getItem("token");
    try {
      await deleteEmployee(employeeId, token);
      alert("Xóa nhân viên và tài khoản liên quan thành công!");
      navigate("/employee-in-company");
    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi xảy ra khi xóa nhân viên!");
    }
  };

  if (!employee) return null;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          THÔNG TIN NHÂN VIÊN
        </Typography>

        <Box mb={3}>
          <img
            src={
              employee.avatarUrl ||
              "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
            }
            alt="avatar"
            style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }}
          />
        </Box>

        <EmployeeForm employee={employee} onChange={() => {}} errors={() => {}} readOnly />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="default" onClick={() => navigate(`/employee/${employeeId}/edit`)}>
            Sửa
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeDetail;
