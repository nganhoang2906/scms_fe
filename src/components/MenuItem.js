import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuItem = ({ icon, title, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = location.pathname === path;

  return (
    <ListItemButton 
      selected={isSelected}
      onClick={() => navigate(path)}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default MenuItem;
