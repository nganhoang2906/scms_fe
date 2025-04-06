import React, { useState } from 'react';
import { IconButton, Box, Popover, Typography } from '@mui/material';
import { Menu as MenuIcon, Person as PersonIcon, Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 15px', alignItems: 'center' }}>
      <IconButton onClick={toggleSidebar} color="inherit"><MenuIcon /></IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color="inherit" onClick={handleProfileClick}><PersonIcon /></IconButton>
        <IconButton color="inherit" onClick={handleClick}><NotificationsIcon /></IconButton>
        <IconButton color="inherit" ><SettingsIcon /></IconButton>
      </Box>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Typography sx={{ p: 2 }}>Chưa có thông báo</Typography>
      </Popover>
    </div>
  );
};

export default Header;
