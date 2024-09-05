import { useAuth } from '../hooks/AuthProvider';

const UserTurn = (props) => {
  const { game } = props;
  const { user } = useAuth();

  const isCurrentUser = (player) => {
    return player.username === user.username;
  };

  const currentUserNotPlaying = (players) => {
    const usernames = players.map((player) => player.user.username);
    return !usernames.includes(user.username);
  };

  const playerToCompleteColor = (player) => {
    if (isCurrentUser(player)) {
      return 'green';
    }
    return 'red';
  };

  const playerToInProgressColor = (player) => {
    if (isCurrentUser(player)) {
      return 'green';
    }
    return '#ffc107';
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
      return playerToCompleteColor(status.winner);
    }
    return playerToInProgressColor(status.nextPlayer);
  };

  const toText = (game) => {
    const status = game.status;
    if (status.complete) {
      return toCompleteText(game);
    }
    const nextPlayer = status.nextPlayer;
    if (isCurrentUser(nextPlayer)) {
      return 'Your turn';
    }
    return `${nextPlayer.fullName}s turn`;
  };

  const toCompleteText = (game) => {
    const status = game.status;
    if (status.draw) {
      return 'Draw';
    }
    if (isCurrentUser(status.winner)) {
      return 'You won';
    }
    if (currentUserNotPlaying(game.players)) {
      return `${status.winner.fullName} won`;
    }
    return 'You lost';
  };

  return <span style={{ color: gameToColor(game) }}>{toText(game)}</span>;
};
export default UserTurn;
