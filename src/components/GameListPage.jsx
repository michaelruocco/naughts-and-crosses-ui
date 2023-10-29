import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';
import Button from '@mui/material/Button';
import { useSubscription } from 'react-stomp-hooks';
import GamesApiClient from 'adapters/GamesApiClient';

import { Box } from '@mui/system';

const GameListPage = () => {
  const handleGameUpdated = (updatedGame) => {
    setGames(updateGames(updatedGame));
  };

  useSubscription('/topic/game-updated', (message) =>
    handleGameUpdated(JSON.parse(message.body)),
  );
  const [games, setGames] = useState([]);

  const createGame = () => {
    const performCreateGame = async () => {
      const newGame = await GamesApiClient.create();
      setGames(updateGames(newGame));
    };
    performCreateGame();
  };

  const updateGames = (updatedGame) => {
    const oldGame = games.find(({ id }) => id === updatedGame.id);
    if (oldGame) {
      return games.map((game) => {
        if (game.id === updatedGame.id) {
          return updatedGame;
        }
        return game;
      });
    }
    return games.concat(updatedGame);
  };

  useEffect(() => {
    const fetchGames = async () => {
      const games = await GamesApiClient.getAll();
      setGames(games);
    };
    fetchGames();
  }, []);

  return (
    <>
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
