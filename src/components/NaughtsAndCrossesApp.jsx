import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import ResponsiveAppBar from 'components/ResponsiveAppBar';
import GameListPage from 'components/GameListPage';
import GameDetailPage from 'components/GameDetailPage';

const NaughtsAndCrossesApp = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Box m={5}>
        <Routes>
          <Route path="/" element={<GameListPage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
        </Routes>
      </Box>
    </>
  );
};
export default NaughtsAndCrossesApp;
