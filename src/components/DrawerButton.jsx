import React from 'react';
import { Box } from '@mui/system';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

const DrawerButton = (props) => {
  const { buttonText, badgeContent, open, onToggle } = props;

  return (
    <Box>
      <Badge badgeContent={badgeContent} color="secondary">
        <Button variant="contained" onClick={() => onToggle(true)}>
          {buttonText}
        </Button>
      </Badge>
      <Drawer open={open} onClose={() => onToggle(false)} anchor="bottom">
        {props.children}
      </Drawer>
    </Box>
  );
};
export default DrawerButton;
