import Grid from '@mui/material/Grid';
import UserListItem from 'components/UserListItem';

const UserList = (props) => {
  const { users, onUpdateUser, onDeleteUser } = props;

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      {users.map((user) => (
        <Grid item key={user.username}>
          <UserListItem
            user={user}
            onUpdateUser={onUpdateUser}
            onDeleteUser={onDeleteUser}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default UserList;
