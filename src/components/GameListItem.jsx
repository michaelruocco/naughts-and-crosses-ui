import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GameListItemStatus from 'components/GameListItemStatus';
import { Button, CardActions } from '@mui/material';
import AdminOnlyComponent from './AdminOnlyComponent';

const GameListItem = (props) => {
  const { game, onViewGame, onDeleteGame } = props;
  const { status } = game;

  const viewGame = () => {
    onViewGame(game.id);
  };

  const deleteGame = () => {
    onDeleteGame(game.id);
  };

  return (
    <Card>
      <CardContent>
        <GameListItemStatus status={status} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => viewGame()}>
          View
        </Button>
        <AdminOnlyComponent>
          <Button size="small" onClick={() => deleteGame()}>
            Delete
          </Button>
        </AdminOnlyComponent>
      </CardActions>
    </Card>
  );
};
export default GameListItem;
