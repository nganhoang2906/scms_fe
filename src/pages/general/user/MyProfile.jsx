import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button, Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "@components/general/EmployeeForm";
import UserForm from "@components/general/UserForm";

import { getEmployeeById } from "@/services/general/EmployeeService";
import { getUserByEmployeeId } from "@/services/general/UserService";
import LoadingPaper from "@/components/content-components/LoadingPaper";

const MyProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const normalizeForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const employeeId = localStorage.getItem("employeeId");

      try {
        const employeeRes = await getEmployeeById(employeeId, token);
        const normalizedEmployee = normalizeForDisplay(employeeRes);
        if (normalizedEmployee.avatarUrl) {
          normalizedEmployee.avatarUrl = `${normalizedEmployee.avatarUrl}?t=${Date.now()}`;
        }
        setEmployee(normalizedEmployee);

        const userRes = await getUserByEmployeeId(employeeId, token);
        setUser(normalizeForDisplay(userRes));
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi tải thông tin người dùng!");
      }
    };

    fetchData();
  }, []);

  if (!employee || !user) {
    return <LoadingPaper title="THÔNG TIN CÁ NHÂN" />;
  }

  return (
    <Container>
      <Paper className="paper-container" elevation={3} >
        <Typography className="page-title" variant="h4" >
          THÔNG TIN CÁ NHÂN
        </Typography>

        <Grid container direction="column" spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Thông tin nhân viên:
            </Typography>

            <Box mb={3}>
              <img
                src={
                  employee.avatarUrl ||
                  "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                }
                alt="avatar"
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%", }}
              />
            </Box>

            <EmployeeForm employee={employee} onChange={() => { }} errors={{}} readOnlyFields={Object.keys(employee)} />

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="default" onClick={() => navigate(`/employee/${employee.employeeId}/edit`)} >
                Sửa thông tin
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Thông tin tài khoản:
            </Typography>

            <UserForm user={user} onChange={() => { }} errors={{}} readOnly />

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="default" onClick={() => navigate(`/user/${user.userId}/edit`)} >
                Sửa tài khoản
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MyProfile;