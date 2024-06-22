import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';
import Button from '@mui/material/Button';
import { useSubscription } from 'react-stomp-hooks';
import PrivateApiClient from 'adapters/PrivateApiClient';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const GameListPage = () => {
  const [games, setGames] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const client = new PrivateApiClient(token);

  const fetchGames = async () => {
    const games = await client.getAllGames();
    setGames(games);
  };

  const handleGameUpdated = (updatedGame) => {
    console.log(`handle game updated ${updatedGame}`);
    setGames(updateGames(updatedGame));
  };

  const handleGameDeleted = (deletedId) => {
    console.log(`handle game deleted ${deletedId}`);
    setGames(games.filter(({ id }) => id !== deletedId));
  };

  const handleViewGame = (id) => {
    navigate(`/game/${id}`);
  };

  const handleDeleteGame = (id) => {
    const deleteGame = async (id) => {
      await client.deleteById(id);
      await fetchGames();
    };
    deleteGame(id);
  };

  useSubscription('/topic/game-update', (message) =>
    handleGameUpdated(JSON.parse(message.body)),
  );

  useSubscription('/topic/game-delete', (message) =>
    handleGameDeleted(parseInt(message.body)),
  );

  const findGameById = (id) => {
    return games.find(({ gameId }) => gameId === id);
  };

  const updateGames = (updatedGame) => {
    const oldGame = findGameById(updatedGame.id);
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
    fetchGames();
  }, []);

  return (
    <>
      <Box m={5} textAlign="center">
        <Button variant="contained" component={Link} to="/create-game">
          New Game
        </Button>
      </Box>
      <GameList
        games={games}
        onViewGame={handleViewGame}
        onDeleteGame={handleDeleteGame}
      />
    </>
  );
};
export default GameListPage;
