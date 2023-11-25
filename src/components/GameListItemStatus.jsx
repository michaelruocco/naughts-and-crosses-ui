import * as React from 'react';
import Typography from '@mui/material/Typography';

const GameListItem = (props) => {
  const { status } = props;

  const toText = (status) => {
    if (status.complete) {
      return toCompleteText(status);
    }
    return `Next Player ${status.nextPlayerToken}`;
  };

  const toCompleteText = (status) => {
    if (status.draw) {
      return 'Draw';
    }
    return `Winner ${status.winner}`;
  };

  return (
    <>
      <Typography variant="body2" color="text.secondary">
        Turn {status.turn}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {toText(status)}
      </Typography>
    </>
  );
};
export default GameListItem;
