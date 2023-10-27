import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';
import GameUpdateHandler from 'components/GameUpdateHandler';

const GameListPage = () => {
  const [games, setGames] = useState([]);

  const handleGameUpdated = (game) => {
    console.log(`handling game updated ${game}`);
    setGames(updateGames(game));
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
      <GameUpdateHandler onGameUpdated={handleGameUpdated} />
      <GameList games={games} />
    </>
  );
};
export default GameListPage;
