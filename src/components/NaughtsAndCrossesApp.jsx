import { Routes, Route } from 'react-router-dom';
import Header from 'components/Header';
import GameListPage from 'components/GameListPage';
import GameDetailPage from 'components/GameDetailPage';

const NaughtsAndCrossesApp = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GameListPage />} />
        <Route path="/game/:id" element={<GameDetailPage />} />
      </Routes>
    </>
  );
};
export default NaughtsAndCrossesApp;
