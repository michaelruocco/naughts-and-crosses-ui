import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const GameListItem = (props) => {
  const { game } = props;
  const { status } = game;

  return (
    <Card>
      <CardActionArea href={`/game/${game.id}`}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Game {game.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Turn {status.turn}, Next Player {status.nextPlayerToken}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default GameListItem;
