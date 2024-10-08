import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../hooks/AuthProvider';
import AppBarUserMenuPublic from './AppBarUserMenuPublic';
import AppBarUserMenuPrivate from './AppBarUserMenuPrivate';
import AdminOnlyComponent from './AdminOnlyComponent';

function ResponsiveAppBar() {
  const { user } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  const titleText = 'Naughts & Crosses';

  const navigateAbout = (event) => {
    event.preventDefault();
    handleCloseNavMenu();
    navigate('/about');
  };

  const navigateUsers = (event) => {
    event.preventDefault();
    handleCloseNavMenu();
    navigate('/users');
  };

  const navigateGames = (event) => {
    event.preventDefault();
    handleCloseNavMenu();
    navigate('/games');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={(event) => navigateGames(event)}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {titleText}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Tooltip title="Open application menu">
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key="Games" onClick={navigateGames}>
                <Typography textAlign="center">Games</Typography>
              </MenuItem>
              <AdminOnlyComponent>
                <MenuItem key="Users" onClick={navigateUsers}>
                  <Typography textAlign="center">Users</Typography>
                </MenuItem>
              </AdminOnlyComponent>
              <MenuItem key="About" onClick={navigateAbout}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            onClick={(event) => navigateGames(event)}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {titleText}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <AdminOnlyComponent>
              <Button
                key="Games"
                onClick={(event) => navigateGames(event)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Games
              </Button>
              <Button
                key="Users"
                onClick={(event) => navigateUsers(event)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Users
              </Button>
              <Button
                key="About"
                onClick={(event) => navigateAbout(event)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
              </Button>
            </AdminOnlyComponent>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user && <AppBarUserMenuPublic />}
            {user && <AppBarUserMenuPrivate />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
