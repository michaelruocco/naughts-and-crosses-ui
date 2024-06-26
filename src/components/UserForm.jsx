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
  const { onSubmit } = props;
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
    fetchGroups();
  }, []);

  return (
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
      </Box>
    </Box>
  );
};
export default UserForm;
