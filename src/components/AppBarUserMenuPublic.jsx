import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

function AppBarUserMenuPublic() {
  const navigate = useNavigate();

  const navigateLogin = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <MenuItem key="Login" onClick={navigateLogin}>
      <Typography textAlign="center">Login</Typography>
    </MenuItem>
  );
}
export default AppBarUserMenuPublic;
