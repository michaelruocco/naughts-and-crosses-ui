import { Box } from '@mui/system';
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
    <Box m={5}>
      <Grid
        container
        direction="column-reverse"
        justifyContent="center"
        spacing={2}
      >
        {games.map((game) => (
          <Grid item key={game.id} onclick={() => viewGame(game.id)}>
            <GameListItem game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default GameList;
