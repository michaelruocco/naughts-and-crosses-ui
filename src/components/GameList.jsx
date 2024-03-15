import Grid from '@mui/material/Grid';
import GameListItem from 'components/GameListItem';

const GameList = (props) => {
  const { games, onViewGame, onDeleteGame } = props;

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      {games.map((game) => (
        <Grid item key={game.id}>
          <GameListItem
            game={game}
            onViewGame={onViewGame}
            onDeleteGame={onDeleteGame}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default GameList;
