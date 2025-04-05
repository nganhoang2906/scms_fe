import React, { useState } from 'react';
import { Drawer, List, Divider, Collapse, ListItemButton, ListItemIcon, ListItemText, Button, Box } from '@mui/material';
import { Home, Info, ContactMail, ExpandLess, ExpandMore, Factory, Business, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/img/logo-sidebar.png";
import MenuItem from '../components/MenuItem';

const SideBar = () => {

  const [openMenus, setOpenMenus] = useState({
    info: false,
    manufacturing: false
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Xóa toàn bộ dữ liệu
    navigate("/login");   // Chuyển về trang đăng nhập
  };  

  const handleToggle = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ padding: 10, textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: 280 }} />
      </div>
      <Divider />
      <List>
        <MenuItem icon={<Home />} title="Trang chủ" path="/homepage" />

        <ListItemButton onClick={() => handleToggle('info')}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="Quản lý thông tin chung" />
          {openMenus.info ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        
        <Collapse in={openMenus.info} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<Business />} title="Thông tin công ty" path="/company-detail" />
            <MenuItem icon={<People />} title="Quản lý phòng ban" path="/department-management" />
            <MenuItem icon={<People />} title="Quản lý nhân viên" path="/employee-management" />
            <MenuItem icon={<ContactMail />} title="Quản lý tài khoản" path="/account-management" />
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleToggle('manufacturing')}>
          <ListItemIcon><Factory /></ListItemIcon>
          <ListItemText primary="Quản lý sản xuất" />
          {openMenus.manufacturing ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMenus.manufacturing} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<Factory />} title="Lệnh sản xuất" path="/manufacturing-orders" />
            <MenuItem icon={<Factory />} title="Quản lý BOM" path="/bom-management" />
          </List>
        </Collapse>
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button color="default" variant="contained" fullWidth onClick={handleLogout} >
          Đăng xuất
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideBar;
