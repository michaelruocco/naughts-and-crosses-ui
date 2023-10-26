const GameList = (props) => {
  const { games } = props;
  return (
    <table>
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
          <tr>
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
