import React, { useState } from 'react';
import UserGroupAutocomplete from './UserGroupAutocomplete';
import PopoverButton from './PopoverButton';
import { Box } from '@mui/system';

const UserGroupFilterButton = (props) => {
  const { filterGroups, onFilterChange } = props;
  const [selectedGroups, setSelectedGroups] = useState(filterGroups);

  const handleGroupsChange = (value) => {
    setSelectedGroups(value);
    onFilterChange(value);
  };

  return (
    <Box>
      <PopoverButton
        popoverId="user-groups-popover"
        buttonText="Filter by Groups"
        badgeContent={selectedGroups.length}
      >
        <Box p={2}>
          <UserGroupAutocomplete
            selectedGroups={selectedGroups}
            disabled={false}
            onGroupsChange={handleGroupsChange}
          />
        </Box>
      </PopoverButton>
    </Box>
  );
};
export default UserGroupFilterButton;
