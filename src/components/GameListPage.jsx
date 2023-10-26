import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';

import SockJsClient from 'react-stomp';

const WEB_SOCKET_URL = 'http://localhost:3002/v1/game-events';

const GameListPage = () => {
  const [games, setGames] = useState([]);

  const onGameMessageReceived = (newGame) => {
    console.log('web socket game updated message received', newGame);
    setGames(updateGames(newGame));
  };

  const updateGames = (newGame) => {
    const oldGame = games.find(({ id }) => id === newGame.id);
    if (oldGame) {
      return games.map((game) => {
        if (game.id === newGame.id) {
          return newGame;
        }
        return game;
      });
    }
    return games.concat(newGame);
  };

  useEffect(() => {
    fetch('http://localhost:3002/v1/games?minimal=true')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <SockJsClient
        url={WEB_SOCKET_URL}
        topics={['/topic/game-updated']}
        onConnect={() => console.log('web socket connected')}
        onDisconnect={console.log('web socket disconnected')}
        onMessage={(game) => onGameMessageReceived(game)}
        debug={false}
      />
      <GameList games={games} />
    </>
  );
};
export default GameListPage;
