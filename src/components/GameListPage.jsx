import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';
import GameUpdateHandler from 'components/GameUpdateHandler';
import Button from '@mui/material/Button';

import { Box } from '@mui/system';

const GameListPage = () => {
  const [games, setGames] = useState([]);

  const createGame = () => {
    fetch('http://localhost:3002/v1/games', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(updateGames(data));
      });
  };

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
      <Box m={5} textAlign="center">
        <Button variant="contained" onClick={createGame}>
          New Game
        </Button>
      </Box>
      <GameList games={games} />
    </>
  );
};
export default GameListPage;
