import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../hooks/AuthProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AppBarUserMenuPrivate() {
  const { user, logout } = useAuth();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const navigateLogin = (event) => {
    event.preventDefault();
    handleCloseUserMenu();
    navigate('/login');
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigateLogin(event);
  };

  return (
    <>
      <Tooltip title="Open user menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="username" disabled={true}>
          <Typography textAlign="center">{user.username}</Typography>
        </MenuItem>
        <MenuItem key="logout" onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            onClick={(event) => handleLogout(event)}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
export default AppBarUserMenuPrivate;
