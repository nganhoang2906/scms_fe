import React, { useState, useEffect } from 'react';
import {
  Drawer, List, Divider, Collapse,
  ListItemButton, ListItemIcon, ListItemText, Button, Box
} from '@mui/material';
import {
  Home, Info, ContactMail, ExpandLess, ExpandMore, Factory, Business, People, Person, RequestPage, Note, Category, Warehouse, BuildCircle,
  ShoppingCart, Sell, Inventory, LocalShipping, ListAlt, RequestQuote, CompareArrows
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
            <MenuItem icon={<Factory />} title="Quản lý xưởng sản xuất" path="/plant-in-company" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<BuildCircle />} title="Quản lý dây chuyền" path="/line-in-company" selectedPath={selectedPath} onSelect={handleSelect} />
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

        <ListItemButton onClick={() => handleToggle('purchasing')}>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Quản lý mua hàng" />
          {openMenus.purchasing ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus.purchasing} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<RequestQuote />} title="Yêu cầu báo giá" path="/purchase-request-quotation" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<Sell />} title="Báo giá" path="/purchase-quotation" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<ListAlt />} title="Đơn mua hàng" path="/purchase-order" selectedPath={selectedPath} onSelect={handleSelect} />
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleToggle('sales')}>
          <ListItemIcon><Sell /></ListItemIcon>
          <ListItemText primary="Quản lý bán hàng" />
          {openMenus.sales ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus.sales} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<Sell />} title="Báo giá" path="/sale-quotation" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<RequestQuote />} title="Yêu cầu báo giá" path="/sale-request-quotation" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<ListAlt />} title="Đơn bán hàng" path="/sale-order" selectedPath={selectedPath} onSelect={handleSelect} />
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleToggle('inventory')}>
          <ListItemIcon><Inventory /></ListItemIcon>
          <ListItemText primary="Quản lý kho" />
          {openMenus.inventory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus.inventory} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<Inventory />} title="Tồn kho" path="/inventory-stock" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<Warehouse />} title="Nhập kho" path="/inventory-receipt" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<Warehouse />} title="Xuất kho" path="/inventory-delivery" selectedPath={selectedPath} onSelect={handleSelect} />
            <MenuItem icon={<CompareArrows />} title="Chuyển kho" path="/inventory-transfer" selectedPath={selectedPath} onSelect={handleSelect} />
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleToggle('delivery')}>
          <ListItemIcon><LocalShipping /></ListItemIcon>
          <ListItemText primary="Quản lý vận chuyển" />
          {openMenus.delivery ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus.delivery} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <List component="div" disablePadding>
            <MenuItem icon={<LocalShipping />} title="Đơn vận chuyển" path="/delivery-order" selectedPath={selectedPath} onSelect={handleSelect} />
          </List>
        </Collapse>
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
