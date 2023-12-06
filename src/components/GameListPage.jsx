import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';
import Button from '@mui/material/Button';
import { useSubscription } from 'react-stomp-hooks';
import GamesApiClient from 'adapters/GamesApiClient';
import { useKeycloak } from '@react-keycloak/web';

import { Box } from '@mui/system';

const GameListPage = () => {
  const [games, setGames] = useState([]);
  const { keycloak } = useKeycloak();
  const client = new GamesApiClient(keycloak.token);

  const handleGameUpdated = (updatedGame) => {
    const updatedGames = updateGames(updatedGame);
    console.log(`updated games ${updatedGames}`);
    setGames(updatedGames);
  };

  useSubscription('/topic/game-update', (message) =>
    handleGameUpdated(JSON.parse(message.body)),
  );

  const createGame = () => {
    const performCreateGame = async () => {
      const newGame = await client.create();
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
      const games = await client.getAll();
      console.log(`got all games from api ${games.map(g => g.id)}`);
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
