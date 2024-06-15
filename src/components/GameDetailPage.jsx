import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Board from 'components/Board';
import { useSubscription } from 'react-stomp-hooks';
import GamesApiClient from 'adapters/GamesApiClient';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

const GameDetailPage = () => {
  const [game, setGame] = useState(null);
  const { id } = useParams();
  const accessToken = sessionStorage.getItem('accessToken');
  const client = new GamesApiClient(accessToken);

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
  };

  const toPdf = (image) => {
    const pdf = new jsPDF();

    const position = 5;
    const margin = position * 2;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imageProps = pdf.getImageProperties(image);
    const imageWidth = pageWidth - margin;
    const imageHeight =
      (imageProps.height * imageWidth) / imageProps.width - margin;
    pdf.addImage(image, 'PNG', margin, margin, imageWidth, imageHeight);

    var y = margin;
    var heightRemaining = imageHeight - pageHeight;
    while (heightRemaining >= 0) {
      y += heightRemaining - imageHeight;
      pdf.addPage();
      pdf.addImage(image, 'PNG', margin, y, imageWidth, imageHeight);
      heightRemaining -= pageHeight;
    }
    return pdf;
  };

  const toPdfFilename = () => {
    return `naughts-and-crosses-game-${game.id}-${Date.now()}.pdf`;
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
