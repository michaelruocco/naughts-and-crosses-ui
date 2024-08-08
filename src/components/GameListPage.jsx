import React, { useState, useEffect } from 'react';
import GameList from 'components/GameList';
import Button from '@mui/material/Button';
import { useSubscription } from 'react-stomp-hooks';
import GameApiClient from 'adapters/GameApiClient';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import NacPagination from 'components/NacPagination';

const GameListPage = () => {
  const pageSize = 5;
  const [games, setGames] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalGames, setTotalGames] = useState(11);
  const [currentPage, setCurrentPage] = useState(1);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const client = new GameApiClient(accessToken);

  const fetchGames = async () => {
    const page = await client.getPage(pageSize, offset, false);
    setGames(page.games);
    setTotalGames(page.total);
    if (offset >= page.total) {
      setOffset(Math.max(page.total - pageSize, 0));
    }
  };

  const handleGameUpdated = (updatedGame) => {
    setGames(updateGames(updatedGame));
  };

  const handleGameDeleted = (deletedId) => {
    setGames(games.filter(({ id }) => id !== deletedId));
  };

  const handleViewGame = (id) => {
    navigate(`/game/${id}`);
  };

  const handleDeleteGame = async (id) => {
    await client.delete(id);
    fetchGames();
  };

  useSubscription('/topic/game-update', (message) =>
    handleGameUpdated(JSON.parse(message.body)),
  );

  useSubscription('/topic/game-delete', (message) =>
    handleGameDeleted(parseInt(message.body)),
  );

  const findGameById = (otherId) => {
    return games.find(({ id }) => id === otherId);
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

  const toOffset = (pageNumber) => {
    return (pageNumber - 1) * pageSize;
  };

  const handlePageSelected = (pageNumber) => {
    const newOffset = toOffset(pageNumber);
    setOffset(newOffset);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchGames();
  }, [offset]);

  return (
    <>
      <Box m={5} textAlign="center">
        <Button variant="contained" component={Link} to="/create-game">
          New Game
        </Button>
      </Box>
      <NacPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalGames}
        onPageSelected={handlePageSelected}
      />
      <GameList
        games={games}
        onViewGame={handleViewGame}
        onDeleteGame={handleDeleteGame}
      />
      <NacPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalGames}
        onPageSelected={handlePageSelected}
      />
    </>
  );
};
export default GameListPage;
