import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameUpdateHandler from 'components/GameUpdateHandler';

const GameDetailPage = () => {
  const [game, setGame] = useState([]);
  const { id } = useParams();

  const handleGameUpdated = (game) => {
    console.log(`handling game updated ${game}`);
    setGame(game);
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
      <p>{JSON.stringify(game)}</p>
    </>
  );
};
export default GameDetailPage;
