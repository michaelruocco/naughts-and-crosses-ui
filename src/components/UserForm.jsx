import React, { useState, useReducer, useEffect } from 'react';
import Button from '@mui/material/Button';
import UserApiClient from 'adapters/UserApiClient';
import { Box } from '@mui/system';
import { useAuth } from '../hooks/AuthProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';

const UserForm = (props) => {
  const { onSubmit, existingUser, buttonText, disabled } = props;
  const [groupOptions, setGroupOptions] = useState([]);

  const newUser = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    emailVerified: true,
    groups: [],
  };
  const initialUser = existingUser || newUser;

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: initialUser.username,
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      email: initialUser.email,
      emailVerified: initialUser.emailVerified,
      groups: initialUser.groups,
    },
  );

  const { accessToken } = useAuth();
  const client = new UserApiClient(accessToken);

  const handleInput = (event) => {
    const target = event.target;
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
    onSubmit(formInput);
  };

  const fetchGroups = async () => {
    const groups = await client.getAllGroups();
    setGroupOptions(groups);
  };

  useEffect(() => {
    setFormInput(initialUser);
  }, [existingUser]);

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="username"
        name="username"
        label="Username"
        margin="normal"
        disabled={initialUser?.username !== '' || disabled}
        value={formInput?.username}
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
        disabled={disabled}
        value={formInput.firstName}
        onChange={handleInput}
        fullWidth
        required
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        margin="normal"
        disabled={disabled}
        value={formInput.lastName}
        onChange={handleInput}
        fullWidth
        required
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        margin="normal"
        disabled={disabled}
        value={formInput.email}
        onChange={handleInput}
        fullWidth
        required
      />
      <FormControlLabel
        id="emailVerified"
        name="emailVerified"
        label="Email Verified"
        disabled={disabled}
        control={<Checkbox checked={formInput.emailVerified} />}
        onChange={handleCheckboxInput}
      />
      <Autocomplete
        disablePortal
        id="groups"
        name="groups"
        label="Groups"
        disabled={disabled}
        multiple={true}
        options={groupOptions}
        value={formInput.groups}
        renderInput={(params) => <TextField {...params} label="Groups" />}
        onChange={handleGroupsInput}
      />
      <Box m={1} textAlign="center">
        <Button variant="contained" type="submit" disabled={disabled}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};
export default UserForm;
