import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameUpdateHandler from 'components/GameUpdateHandler';
import Board from 'components/Board';

const GameDetailPage = () => {
  const [game, setGame] = useState([]);
  const { id } = useParams();

  const handleGameUpdated = (game) => {
    console.log(`handling game updated ${game}`);
    setGame(game);
  };

  const takeTurn = (location) => {
    const body = JSON.stringify({
      coordinates: location.coordinates,
      token: game.status.nextPlayerToken,
    });
    fetch(`http://localhost:3002/v1/games/${id}/turns`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      });
  };

  const handleLocationSelected = (location) => {
    takeTurn(location);
  };

  useEffect(() => {
    fetch(`http://localhost:3002/v1/games/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <GameUpdateHandler onGameUpdated={handleGameUpdated} />
      <Board board={game.board} onLocationSelected={handleLocationSelected} />
    </>
  );
};
export default GameDetailPage;
