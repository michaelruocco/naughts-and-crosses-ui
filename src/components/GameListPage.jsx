import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';
import Button from '@mui/material/Button';
import { useSubscription } from 'react-stomp-hooks';
import GamesApiClient from 'adapters/GamesApiClient';
import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const GameListPage = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const client = new GamesApiClient(keycloak.token);

  const fetchGames = async () => {
    const games = await client.getAllGames();
    setGames(games);
  };

  const handleGameUpdated = (updatedGame) => {
    const updatedGames = updateGames(updatedGame);
    console.log(`updated games ${updatedGames}`);
    setGames(updatedGames);
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
