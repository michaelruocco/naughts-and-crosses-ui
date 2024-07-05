import { useAuth } from '../hooks/AuthProvider';

const UserTurn = (props) => {
  const { game } = props;
  const { user } = useAuth();

  const isCurrentUser = (player) => {
    return player.username === user.username;
  };

  const currentUserNotPlaying = (players) => {
    console.log(JSON.stringify(players));
    const usernames = players.map((player) => player.user.username);
    return !usernames.includes(user.username);
  };

  const playerToColor = (player) => {
    if (isCurrentUser(player)) {
      return 'green';
    }
    return 'red';
  };

  const gameToColor = (game) => {
    if (currentUserNotPlaying(game.players)) {
      return 'black';
    }
    const status = game.status;
    if (status.draw) {
      return 'black';
    }
    if (status.complete) {
      return playerToColor(status.winner);
    }
    return playerToColor(status.nextPlayer);
  };

  const toText = (status) => {
    if (status.complete) {
      return toCompleteText(status);
    }
    const nextPlayer = status.nextPlayer;
    if (isCurrentUser(nextPlayer)) {
      return 'Your turn';
    }
    return `${nextPlayer.username}s turn`;
  };

  const toCompleteText = (status) => {
    if (status.draw) {
      return 'Draw';
    }
    if (isCurrentUser(status.winner)) {
      return 'You won';
    }
    return `${status.winner.username} won`;
  };

  return (
    <span style={{ color: gameToColor(game) }}>{toText(game.status)}</span>
  );
};
export default UserTurn;
