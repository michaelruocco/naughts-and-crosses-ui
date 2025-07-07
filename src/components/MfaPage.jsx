import React, { useState, useReducer } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';

const MfaPage = () => {
  const [ searchParams ] = useSearchParams();
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const navigate = useNavigate();
  const auth = useAuth();
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      userCode: '',
    },
  );

  const handleInput = (event) => {
    const target = event.target;
    setFormInput({ [target.name]: target.value });
  };

  const closeSnackbar = () => {
    setSnackState(closedSnackState);
  };

  const setErrorMessage = (message) => {
    setSnackState({ open: true, message: message });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    closeSnackbar();
    try {
      const request = {
        username: searchParams.get('username'),
        challenge: searchParams.get('challenge'),
        session: searchParams.get('session'),
        userCode: formInput.userCode
      }
      console.log(`respond to challenge ${JSON.stringify(request)}`);
      await auth.respondToChallenge(request);
      navigate('/');
    } catch (e) {
      console.debug(e.message);
      setErrorMessage('Login failed');
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="userCode"
          name="userCode"
          label="Code"
          margin="normal"
          onChange={handleInput}
          fullWidth
          autoFocus
          required
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
  );
};
export default MfaPage;
