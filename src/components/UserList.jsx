import Grid from '@mui/material/Grid';
import UserListItem from 'components/UserListItem';
import { useAuth } from '../hooks/AuthProvider';

const UserList = (props) => {
  const { users, onUpdateUser, onViewUserGames, onDeleteUser } = props;
  const { isAuthedUsername } = useAuth();
  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      {users.map((user) => (
        <Grid item key={user.username}>
          <UserListItem
            user={user}
            modificationEnabled={!isAuthedUsername(user.username)}
            onUpdateUser={onUpdateUser}
            onViewUserGames={onViewUserGames}
            onDeleteUser={onDeleteUser}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default UserList;
