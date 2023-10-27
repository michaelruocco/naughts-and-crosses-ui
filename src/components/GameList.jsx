import { useNavigate } from 'react-router-dom';

const GameList = (props) => {
  const { games } = props;
  const navigate = useNavigate();

  const viewGame = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <table class="gameTable">
      <thead>
        <tr>
          <th>Turn</th>
          <th>Complete</th>
          <th>Next Player</th>
          <th>Winner</th>
        </tr>
      </thead>
      {games.map((game) => (
        <tbody key={game.id}>
          <tr onClick={() => viewGame(game.id)}>
            <td>{game.status.turn}</td>
            <td>{game.status.complete.toString()}</td>
            <td>{game.status.nextPlayerToken}</td>
            <td>{game.status.winningToken}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
export default GameList;
