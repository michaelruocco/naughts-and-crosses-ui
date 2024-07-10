import React, { useState } from 'react';
import UserApiClient from 'adapters/UserApiClient';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';
import UserForm from './UserForm';
import UserListButton from './UserListButton';

const CreateUserPage = () => {
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);

  const { accessToken } = useAuth();
  const client = new UserApiClient(accessToken);
  const navigate = useNavigate();

  const closeSnackbar = () => {
    setSnackState(closedSnackState);
  };

  const setErrorMessage = (message) => {
    setSnackState({ open: true, message: message });
  };

  const setSuccessMessage = (message) => {
    setSnackState({ open: true, message: message, severity: 'success' });
  };

  const handleSubmit = async (formInput) => {
    closeSnackbar();
    try {
      const user = await client.create(formInput);
      setSuccessMessage(`User ${user.username} created successfully`);
      navigate('/users');
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <UserListButton />
      <UserForm onSubmit={handleSubmit} buttonText="Create" />
      <AlertSnackbar
        open={snackState.open}
        severity={snackState.severity}
        message={snackState.message}
        onClose={closeSnackbar}
      />
    </Grid>
  );
};
export default CreateUserPage;
