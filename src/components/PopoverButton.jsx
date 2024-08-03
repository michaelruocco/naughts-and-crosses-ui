import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';

const PopoverButton = (props) => {
  const { popoverId, buttonText, badgeContent } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? popoverId : undefined;

  return (
    <>
      <Badge badgeContent={badgeContent} color="secondary">
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
        {props.children}
      </Popover>
    </>
  );
};
export default PopoverButton;
