import React from 'react';
import TextField from '@mui/material/TextField';

const UserSearchTextField = (props) => {
  const { searchTerm, onSearchTermChange } = props;

  const handleSearchTermChange = (event) => {
    const target = event.target;
    onSearchTermChange(target.value);
  };

  return (
    <TextField
      id="searchTerm"
      name="searchTerm"
      label="Email, username or name"
      value={searchTerm}
      onChange={handleSearchTermChange}
      sx={{ minWidth: 350 }}
      fullWidth
      margin="normal"
    />
  );
};
export default UserSearchTextField;
