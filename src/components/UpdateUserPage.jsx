import React, { useState, useEffect } from 'react';
import UserApiClient from 'adapters/UserApiClient';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';
import UserForm from './UserForm';
import { useParams } from 'react-router-dom';
import UserListButton from './UserListButton';

const UpdateUserPage = () => {
  const { username } = useParams();
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const [user, setUser] = useState(null);

  const { token } = useAuth();
  const client = new UserApiClient(token);
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
      const user = await client.update(formInput);
      setSuccessMessage(`User ${user.username} updated successfully`);
      navigate('/users');
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const fetchUser = async (username) => {
    const user = await client.get(username);
    setUser(user);
  };

  useEffect(() => {
    fetchUser(username);
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <UserListButton />
      <UserForm
        onSubmit={handleSubmit}
        existingUser={user}
        buttonText="Update"
      />
      <AlertSnackbar
        open={snackState.open}
        severity={snackState.severity}
        message={snackState.message}
        onClose={closeSnackbar}
      />
    </Grid>
  );
};
export default UpdateUserPage;
