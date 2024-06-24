import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

const UserListItem = (props) => {
  const { user, onDeleteUser } = props;

  const toEmailTextColor = (verified) => {
    if (verified) {
      return 'green';
    }
    return 'red';
  };

  const deleteUser = () => {
    onDeleteUser(user.username);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{user.fullName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.username}
        </Typography>
        <Typography
          variant="body2"
          color={toEmailTextColor(user.emailVerified)}
        >
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => deleteUser()}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default UserListItem;
