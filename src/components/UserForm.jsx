import React, { useReducer, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import UserGroupAutocomplete from './UserGroupAutocomplete';

const UserForm = (props) => {
  const { onSubmit, existingUser, buttonText, disabled } = props;

  const newUser = {
    username: '',
    name: '',
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
      fullName: initialUser.fullName,
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      email: initialUser.email,
      emailVerified: initialUser.emailVerified,
      groups: initialUser.groups,
    },
  );

  const handleInput = (event) => {
    const target = event.target;
    setFormInput({ [target.name]: target.value });
  };

  const handleCheckboxInput = (event) => {
    const target = event.target;
    setFormInput({ [target.name]: target.checked });
  };

  const handleGroupsInput = (value) => {
    setFormInput({ groups: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formInput);
  };

  useEffect(() => {
    setFormInput(initialUser);
  }, [existingUser]);

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
      <UserGroupAutocomplete
        selectedGroups={formInput.groups}
        disabled={disabled}
        onGroupsChange={handleGroupsInput}
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
