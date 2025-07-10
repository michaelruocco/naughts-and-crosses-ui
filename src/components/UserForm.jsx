import React, { useReducer, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import UserGroupAutocomplete from './UserGroupAutocomplete';

const UserForm = (props) => {
  const { onSubmit, existingUser, buttonText, disabled } = props;

  const toMfaSettings = (enabled) => {
    return {
      softwareToken: {
        enabled: enabled,
        preferred: enabled,
      }
    };
  }

  const newUser = {
    username: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    emailVerified: true,
    groups: [],
    mfa: toMfaSettings(false),
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
      mfa: initialUser.mfa,
    },
  );

  const handleInput = (event) => {
    const target = event.target;
    setFormInput({ [target.name]: target.value });
  };

  const handleSwitchInput = (event) => {
    const target = event.target;
    setFormInput({ [target.name]: target.checked });
  };

  const handleMfaEnabledChanged = (event) => {
    const target = event.target;
    console.log(`setting mfa ${JSON.stringify(toMfaSettings(target.checked))}`);
    setFormInput({ 'mfa': toMfaSettings(target.checked) });
  };


  const handleGroupsInput = (value) => {
    setFormInput({ groups: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formInput));
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
      <Box sx={{ mb: 1 }}>
        <FormControlLabel
          id="emailVerified"
          name="emailVerified"
          label="Email Verified" 
          disabled={disabled}
          control={<Switch checked={formInput.emailVerified} name="emailVerified" onChange={handleSwitchInput} />}
        />
      </Box>
      <UserGroupAutocomplete
        selectedGroups={formInput.groups}
        disabled={disabled}
        onGroupsChange={handleGroupsInput}
      />
      <Box sx={{ mb: 1 }}>
        <FormControlLabel
          id="softwareMfaEnabled"
          name="softwareMfaEnabled"
          label="MFA Enabled" 
          disabled={disabled || !formInput.mfa?.softwareToken?.enabled }
          control={<Switch checked={formInput.mfa?.softwareToken?.enabled || false} onChange={handleMfaEnabledChanged} />}
        />
      </Box>
      <Box m={1} textAlign="center">
        <Button variant="contained" type="submit" disabled={disabled}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};
export default UserForm;
