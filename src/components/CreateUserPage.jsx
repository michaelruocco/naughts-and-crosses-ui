import React, { useState, useReducer, useEffect } from 'react';
import Button from '@mui/material/Button';
import UserApiClient from 'adapters/UserApiClient';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';

const CreateUserPage = () => {
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const [groupOptions, setGroupOptions] = useState([]);
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: '',
      firstName: '',
      lastName: '',
      email: null,
      emailVerified: false,
      groups: [],
    },
  );

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

  const handleInput = (event) => {
    const target = event.target;
    console.log(`target value ${target.value}`);
    setFormInput({ [target.name]: target.value });
  };

  const handleCheckboxInput = (event) => {
    const target = event.target;
    setFormInput({ [target.name]: target.checked });
  };

  const handleGroupsInput = (event, value) => {
    setFormInput({ groups: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    closeSnackbar();
    try {
      const user = await client.create(formInput);
      setSuccessMessage(`User ${user.username} created successfully`);
      navigate('/users');
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const fetchGroups = async () => {
    const groups = await client.getAllGroups();
    console.log(`group options ${groups}`);
    setGroupOptions(groups);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Username"
          margin="normal"
          onChange={handleInput}
          fullWidth
          autoFocus
          required
        />
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          margin="normal"
          onChange={handleInput}
          fullWidth
          required
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          margin="normal"
          onChange={handleInput}
          fullWidth
          required
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          margin="normal"
          onChange={handleInput}
          fullWidth
          required
        />
        <FormControlLabel
          id="emailVerified"
          name="emailVerified"
          control={<Checkbox defaultChecked />}
          label="Email Verified"
          onChange={handleCheckboxInput}
        />
        <Autocomplete
          disablePortal
          id="groups"
          name="groups"
          label="Groups"
          multiple={true}
          options={groupOptions}
          renderInput={(params) => <TextField {...params} label="Groups" />}
          onChange={handleGroupsInput}
        />
        <Box m={1} textAlign="center">
          <Button variant="contained" type="submit">
            Create
          </Button>
          <AlertSnackbar
            open={snackState.open}
            severity={snackState.severity}
            message={snackState.message}
            onClose={closeSnackbar}
          />
        </Box>
      </Box>
    </Grid>
  );
};
export default CreateUserPage;
