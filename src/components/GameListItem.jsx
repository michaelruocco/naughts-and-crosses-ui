import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GameListItemStatus from 'components/GameListItemStatus';
import { CardActionArea } from '@mui/material';

const GameListItem = (props) => {
  const { game } = props;
  const { status } = game;

  return (
    <Card>
      <CardActionArea href={`/game/${game.id}`}>
        <CardContent>
          <GameListItemStatus status={status} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default GameListItem;
