import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Board from 'components/Board';
import { useSubscription } from 'react-stomp-hooks';
import GamesApiClient from 'adapters/GamesApiClient';
import { useKeycloak } from '@react-keycloak/web';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const GameDetailPage = () => {
  const [game, setGame] = useState(null);
  const { id } = useParams();
  const { keycloak } = useKeycloak();
  const client = new GamesApiClient(keycloak.token);

  const handleGameUpdated = (updatedGame) => {
    if (isUpdateRelevant(updatedGame)) {
      setGame(updatedGame);
      return;
    }
    console.debug(`update for game with id ${updatedGame.id} ignored`);
  };

  const exportToPdf = () => {
    const performExportToPdf = async () => {
      const element = document.getElementById('pdf');
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    };
    performExportToPdf();
  };

  const isUpdateRelevant = (updatedGame) => {
    return game.id === updatedGame.id && game !== updatedGame;
  };

  useSubscription('/topic/game-update', (message) =>
    handleGameUpdated(JSON.parse(message.body)),
  );

  const takeTurn = (location) => {
    const performTakeTurn = async (request) => {
      const updatedGame = await client.takeTurn(request);
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
      const game = await client.getById(id);
      setGame(game);
    };
    fetchGame();
  }, []);

  return (
    game && (
      <>
        <Box m={5} textAlign="center">
          <Button variant="contained" onClick={exportToPdf}>
            Export to PDF
          </Button>
        </Box>
        <div id="pdf">
          <Board
            board={game.board}
            onLocationSelected={handleLocationSelected}
            enabled={!game.status.complete}
          />
        </div>
      </>
    )
  );
};
export default GameDetailPage;
