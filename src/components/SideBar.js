import React, { useState } from 'react';
import { Drawer, List, Divider, Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Info, ContactMail, ExpandLess, ExpandMore, Factory, Business, People } from '@mui/icons-material';
import logo from "../assets/img/logo-sidebar.png";
import MenuItem from '../components/MenuItem';

const SideBar = () => {

  // Trạng thái mở rộng của các menu có submenu
  const [openMenus, setOpenMenus] = useState({
    info: false,
    manufacturing: false
  });

  // Toggle menu cha
  const handleToggle = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <Drawer variant="permanent" anchor="left">
      {/* Logo */}
      <div style={{ padding: 10, textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: 280 }} />
      </div>
      <Divider />
      <List>
        {/* Trang chủ */}
        <MenuItem icon={<Home />} title="Trang chủ" path="/homepage" />

        {/* Quản lý thông tin chung */}
        <ListItemButton onClick={() => handleToggle('info')}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="Quản lý thông tin chung" />
          {openMenus.info ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus.info} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<Business />} title="Thông tin công ty" path="/company-info" />
            <MenuItem icon={<People />} title="Quản lý phòng ban" path="/department-management" />
            <MenuItem icon={<People />} title="Quản lý nhân viên" path="/employee-management" />
            <MenuItem icon={<ContactMail />} title="Quản lý tài khoản" path="/account-management" />
          </List>
        </Collapse>

        {/* Quản lý sản xuất */}
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
    </Drawer>
  );
};

export default SideBar;
