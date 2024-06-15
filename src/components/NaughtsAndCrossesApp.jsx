import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import ResponsiveAppBar from 'components/ResponsiveAppBar';
import { Box } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import GameListPage from 'components/GameListPage';
import GameDetailPage from 'components/GameDetailPage';
import CreateGamePage from 'components/CreateGamePage';
import AboutPage from 'components/AboutPage';
import ProtectedRoute from 'components/ProtectedRoute';
import LoginPage from 'components/LoginPage';
import StompEnabled from './StompEnabled';

const NaughtsAndCrossesApp = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <ResponsiveAppBar />
        <Box m={5}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <StompEnabled>
                    <GameListPage />
                  </StompEnabled>
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:id"
              element={
                <ProtectedRoute>
                  <StompEnabled>
                    <GameDetailPage />
                  </StompEnabled>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-game"
              element={
                <ProtectedRoute>
                  <CreateGamePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
};

export default NaughtsAndCrossesApp;
