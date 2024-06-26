import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const UserListButton = () => {
  return (
    <Button variant="contained" component={Link} to="/users">
      User List
    </Button>
  );
};
export default UserListButton;
