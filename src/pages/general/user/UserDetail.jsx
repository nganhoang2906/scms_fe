import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "@components/general/UserForm";
import { getUserById } from "@services/general/UserService";
import LoadingPaper from "@/components/content-components/LoadingPaper";

const UserDetail = () => {
  const { userId } = useParams();
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
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getUserById(userId, token);
        const normalizedData = normalizeForDisplay(data);

        setUser(normalizedData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin người dùng!");
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <LoadingPaper title="THÔNG TIN TÀI KHOẢN" />;
  }

  return (
    <Container>
      <Paper className="paper-container" elevation={3} >
        <Typography className="page-title" variant="h4" >
          THÔNG TIN TÀI KHOẢN
        </Typography>

        <UserForm user={user} onChange={() => { }} errors={{}} readOnly />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="default" onClick={() => navigate(`/user/${userId}/edit`)}>
            Sửa
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDetail;
