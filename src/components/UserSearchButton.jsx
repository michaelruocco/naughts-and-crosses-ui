import React, { useState } from 'react';
import PopoverButton from './PopoverButton';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';

const UserSearchButton = (props) => {
  const { searchTerm, onSearchTermChange } = props;

  const handleSearchTermChange = (event) => {
    const target = event.target;
    1;
    onSearchTermChange(target.value);
  };

  const badgeContent = searchTerm ? '' : 0;
  return (
    <Box>
      <PopoverButton
        popoverId="search-popover"
        buttonText="Search"
        badgeContent={badgeContent}
      >
        <Box p={2}>
          <TextField
            id="searchTerm"
            name="searchTerm"
            label="Email, username or name"
            value={searchTerm}
            onChange={handleSearchTermChange}
            sx={{ minWidth: 350 }}
            fullWidth
          />
        </Box>
      </PopoverButton>
    </Box>
  );
};
export default UserSearchButton;
