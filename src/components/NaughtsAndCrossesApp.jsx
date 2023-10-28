import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from 'components/ResponsiveAppBar';
import GameListPage from 'components/GameListPage';
import GameDetailPage from 'components/GameDetailPage';

const NaughtsAndCrossesApp = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<GameListPage />} />
        <Route path="/game/:id" element={<GameDetailPage />} />
      </Routes>
    </>
  );
};
export default NaughtsAndCrossesApp;
