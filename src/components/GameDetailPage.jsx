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
import { toPng } from 'html-to-image';

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

  const exportBoardToPdf = () => {
    const performExportBoardToPdf = async () => {
      const image = await getBoardAsImage();
      const pdf = toPdf(image);
      pdf.save(toPdfFilename());
    };
    performExportBoardToPdf();
  };
  
  const getBoardAsImage = async () => {
    const element = document.getElementById('pdf-board-container');
    return await toPng(element);
  }

  const toPdf = (image) => {
    const pdf = new jsPDF();
    const properties = pdf.getImageProperties(image);
    const width = pdf.internal.pageSize.getWidth();
    const height = (properties.height * width) / properties.width;
    pdf.addImage(image, 'PNG', 0, 0, width, height);
    return pdf;
  }

  const toPdfFilename = () => {
    return `naughts-and-crosses-game-${game.id}-${Date.now()}.pdf`
  }

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
          <Button variant="contained" onClick={exportBoardToPdf}>
            Export to PDF
          </Button>
        </Box>
        <div id="pdf-board-container">
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
