import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';

const LoginPage = () => {
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const navigate = useNavigate();
  const auth = useAuth();

  const closeSnackbar = () => {
    setSnackState(closedSnackState);
  };

  const setErrorMessage = (message) => {
    setSnackState({ open: true, message: message });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    closeSnackbar();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    if (!username || !password) {
      setErrorMessage('Both username and password must be provided');
      return;
    }
    try {
      await auth.login(username, password);
      navigate('/');
    } catch (e) {
      console.debug(e.message);
      setErrorMessage('Login failed');
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate m={1}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Box m={1} textAlign="center">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
          <AlertSnackbar
            open={snackState.open}
            message={snackState.message}
            onClose={closeSnackbar}
          />
        </Box>
      </Grid>
    </>
  );
};
export default LoginPage;
