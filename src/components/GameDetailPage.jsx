import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Board from 'components/Board';
import { useSubscription } from 'react-stomp-hooks';
import GamesApiClient from 'adapters/GamesApiClient';

const GameDetailPage = () => {
  const [game, setGame] = useState(null);
  const { id } = useParams();

  const handleGameUpdated = (updatedGame) => {
    if (isUpdateRelevant(updatedGame)) {
      setGame(updatedGame);
      return;
    }
    console.log(`update for game with id ${updatedGame.id} ignored`);
  };

  const isUpdateRelevant = (updatedGame) => {
    return game.id === updatedGame.id && game !== updatedGame;
  };

  useSubscription('/topic/game-updated', (message) =>
    handleGameUpdated(JSON.parse(message.body)),
  );

  const takeTurn = (location) => {
    const performTakeTurn = async (request) => {
      const updatedGame = await GamesApiClient.takeTurn(request);
      setGame(updatedGame);
    };
    performTakeTurn({
      id: id,
      body: {
        coordinates: location.coordinates,
        token: game.status.nextPlayerToken,
      },
    });
  };

  const handleLocationSelected = (location) => {
    takeTurn(location);
  };

  useEffect(() => {
    const fetchGame = async () => {
      const game = await GamesApiClient.getById(id);
      setGame(game);
    };
    fetchGame();
  }, []);

  return (
    game && (
      <Board board={game.board} onLocationSelected={handleLocationSelected} />
    )
  );
};
export default GameDetailPage;
