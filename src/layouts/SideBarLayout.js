import React from "react";
import SideBar from "../components/SideBar"; // Tùy bạn tạo
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const SideBarLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, ml: '300px', p: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default SideBarLayout;
