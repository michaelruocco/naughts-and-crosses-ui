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
import UserListPage from 'components/UserListPage';
import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'components/LoginPage';
import StompEnabled from './StompEnabled';
import AuthProvider from '../hooks/AuthProvider';

const NaughtsAndCrossesApp = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ResponsiveAppBar />
          <Box m={5}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <StompEnabled>
                      <GameListPage />
                    </StompEnabled>
                  </PrivateRoute>
                }
              />
              <Route
                path="/game/:id"
                element={
                  <PrivateRoute>
                    <StompEnabled>
                      <GameDetailPage />
                    </StompEnabled>
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-game"
                element={
                  <PrivateRoute>
                    <CreateGamePage />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <UserListPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default NaughtsAndCrossesApp;
