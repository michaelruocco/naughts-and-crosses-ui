import Grid from '@mui/material/Grid';
import GameListItem from 'components/GameListItem';
import { useNavigate } from 'react-router-dom';

const GameList = (props) => {
  const navigate = useNavigate();
  const { games } = props;

  const viewGame = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <Grid
      container
      direction="column-reverse"
      justifyContent="center"
      spacing={2}
    >
      {games.map((game) => (
        <Grid item key={game.id} onClick={() => viewGame(game.id)}>
          <GameListItem game={game} />
        </Grid>
      ))}
    </Grid>
  );
};
export default GameList;
