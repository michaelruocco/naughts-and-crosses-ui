import React from 'react';
import { Box } from '@mui/system';
import UserGroupAutocomplete from './UserGroupAutocomplete';
import UserSearchTextField from './UserSearchTextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const UserFilters = (props) => {
  const {
    searchTerm,
    onSearchTermChange,
    groups,
    onGroupsChange,
    onClear,
    onClose,
  } = props;

  return (
    <Box component="form" m={2}>
      <UserGroupAutocomplete
        selectedGroups={groups}
        disabled={false}
        onGroupsChange={onGroupsChange}
      />
      <UserSearchTextField
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
      />
      <Box m={1} textAlign="center">
        <ButtonGroup>
          <Button variant="contained" onClick={onClear}>
            Clear
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
export default UserFilters;
