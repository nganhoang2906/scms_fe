import React, { useState } from "react";
import SideBar from "@/components/layout-components/SideBar"; // Tùy bạn tạo
import Header from "@/components/layout-components/Header";  // Import Header
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const SideBarLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);  // Đổi trạng thái mở/đóng sidebar
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header toggleSidebar={toggleSidebar} />
        <Outlet/>
      </Box>
    </div>
  );
};

export default SideBarLayout;
