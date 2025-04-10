import React, { useState, useEffect } from 'react';
import {
  Drawer, List, Divider, Collapse,
  ListItemButton, ListItemIcon, ListItemText, Button, Box
} from '@mui/material';
import {
  Home, Info, ContactMail, ExpandLess, ExpandMore,
  Factory, Business, People, Person, RequestPage, Note, Category, Warehouse
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "@assets/img/logo-sidebar.png";
import MenuItem from './MenuItem';

const SideBar = ({ openSidebar, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const companyType = localStorage.getItem("companyType");

  const [openMenus, setOpenMenus] = useState(() => {
    const saved = localStorage.getItem("openMenus");
    return saved ? JSON.parse(saved) : {
      info: false,
      manufacturing: false,
    };
  });

  const [selectedPath, setSelectedPath] = useState(() => {
    return localStorage.getItem("selectedMenuPath") || location.pathname || "/homepage";
  });

  // Lưu trạng thái khi thay đổi
  useEffect(() => {
    localStorage.setItem("openMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  useEffect(() => {
    localStorage.setItem("selectedMenuPath", selectedPath);
  }, [selectedPath]);

  const handleToggle = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleSelect = (path) => {
    setSelectedPath(path);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Drawer variant={openSidebar ? 'permanent' : 'temporary'} anchor="left" open={openSidebar} onClose={toggleSidebar}
      sx={{
        width: openSidebar ? 280 : 0,
        transition: 'width 0.3s',
        overflowX: 'hidden',
      }}
    >
      <div style={{ padding: 10, textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: openSidebar ? 280 : 0 }} />
      </div>
      <Divider />
      <List>
        <MenuItem icon={<Home />} title="Trang chủ" path="/homepage" selectedPath={selectedPath} onSelect={handleSelect} />

        <ListItemButton onClick={() => handleToggle('info')}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="Quản lý thông tin chung" />
          {openMenus.info ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMenus.info} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<Business />} title="Thông tin công ty" path="/company-detail" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<People />} title="Quản lý phòng ban" path="/department-in-company" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<Person />} title="Quản lý nhân viên" path="/employee-in-company" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<ContactMail />} title="Quản lý tài khoản" path="/user-in-company" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<Category />} title="Quản lý hàng hóa" path="/item-in-company" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<Warehouse />} title="Quản lý kho" path="/warehouse-in-company" selectedPath={selectedPath} onSelect={handleSelect} />
          </List>
        </Collapse>

        {companyType === "Doanh nghiệp sản xuất" && (
          <>
            <ListItemButton onClick={() => handleToggle('manufacturing')}>
              <ListItemIcon><Factory /></ListItemIcon>
              <ListItemText primary="Quản lý sản xuất" />
              {openMenus.manufacturing ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openMenus.manufacturing} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
              <List component="div" disablePadding>
                <MenuItem icon={<RequestPage />} title="Lệnh sản xuất" path="/manufacturing-orders" selectedPath={selectedPath} onSelect={handleSelect} />
                <MenuItem icon={<Note />} title="Quản lý BOM" path="/bom-management" selectedPath={selectedPath} onSelect={handleSelect} />
              </List>
            </Collapse>
          </>
        )}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button color="default" variant="contained" fullWidth onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideBar;
