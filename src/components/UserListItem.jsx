import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';

const UserListItem = (props) => {
  const {
    user,
    modificationEnabled,
    onUpdateUser,
    onViewUserGames,
    onDeleteUser,
  } = props;

  const toEmailTextColor = (verified) => {
    if (verified) {
      return 'green';
    }
    return 'red';
  };

  const updateUser = () => {
    onUpdateUser(user.username);
  };

  const viewUserGames = () => {
    onViewUserGames(user.username);
  };

  const deleteUser = () => {
    onDeleteUser(user.username);
  };

  const toStatusChipColor = (status) => {
    if (status === 'CONFIRMED') {
      return 'success';
    }
    return 'primary';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {user.username}{' '}
          <Chip
            label={user.status.replaceAll('_', ' ')}
            color={toStatusChipColor(user.status)}
          />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.groups.join(', ')}
        </Typography>
        <Typography
          variant="body2"
          color={toEmailTextColor(user.emailVerified)}
        >
          {user.email}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => viewUserGames()}>
          Games
        </Button>
        {modificationEnabled && (
          <>
            <Button size="small" onClick={() => updateUser()}>
              Update
            </Button>
            <Button size="small" onClick={() => deleteUser()}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};
export default UserListItem;
