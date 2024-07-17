import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import UserGroupAutocomplete from './UserGroupAutocomplete';
import { Box } from '@mui/system';
import Badge from '@mui/material/Badge';

const FilterMenuButton = (props) => {
  const { popoverId, buttonText, filterValues, onFilterChange } = props;
  const [selectedFilters, setSelectedFilters] = useState(filterValues);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (value) => {
    setSelectedFilters(value);
    onFilterChange(value);
  };

  const open = Boolean(anchorEl);
  const id = open ? popoverId : undefined;

  return (
    <Box>
      <Badge badgeContent={selectedFilters.length} color="secondary">
        <Button aria-describedby={id} onClick={handleClick} variant="contained">
          {buttonText}
        </Button>
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: -125,
        }}
      >
        <Box p={2}>
          <UserGroupAutocomplete
            selectedGroups={selectedFilters}
            disabled={false}
            onGroupsChange={handleFilterChange}
          />
        </Box>
      </Popover>
    </Box>
  );
};
export default FilterMenuButton;
