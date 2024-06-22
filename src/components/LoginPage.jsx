import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useAuth } from '../hooks/AuthProvider';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    if (!username || !password) {
      setErrorMessage('Both username and password must be provided');
      return null;
    }
    try {
      await auth.login(username, password);
      navigate('/');
    } catch (e) {
      console.log(e.message);
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
        </Box>
        {errorMessage ? (
          <Box m={1} textAlign="center">
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        ) : null}
      </Grid>
    </>
  );
};
export default LoginPage;
