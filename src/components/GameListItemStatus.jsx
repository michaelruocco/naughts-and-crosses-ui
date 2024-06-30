import * as React from 'react';
import Typography from '@mui/material/Typography';
import UserTurn from './UserTurn';

const GameListItem = (props) => {
  const { game } = props;
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        <UserTurn game={game} />
      </Typography>
    </>
  );
};
export default GameListItem;
