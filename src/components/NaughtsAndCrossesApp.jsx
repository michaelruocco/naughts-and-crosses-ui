import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import ResponsiveAppBar from 'components/ResponsiveAppBar';
import { Box } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import GameListPage from 'components/GameListPage';
import GameDetailPage from 'components/GameDetailPage';
import CreateGamePage from 'components/CreateGamePage';
import CreateUserPage from 'components/CreateUserPage';
import UpdateUserPage from 'components/UpdateUserPage';
import AboutPage from 'components/AboutPage';
import UserListPage from 'components/UserListPage';
import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'components/LoginPage';
import StompEnabled from './StompEnabled';
import AuthProvider from '../hooks/AuthProvider';
import AdminOnlyRoute from './AdminOnlyRoute';
import Redirect from './Redirect';
import LoginCallback from './LoginCallback';

const NaughtsAndCrossesApp = () => {
  const hostedLoginUrl = `${APP_LOGIN_URL}`;
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ResponsiveAppBar />
          <Box m={5}>
            <Routes>
              {hostedLoginUrl && (
                <>
                  <Route
                    path="/login"
                    element={<Redirect url={hostedLoginUrl} />}
                  />
                  <Route path="/login/callback" element={<LoginCallback />} />
                </>
              )}
              {!hostedLoginUrl && (
                <Route path="/login" element={<LoginPage />} />
              )}
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
                  <AdminOnlyRoute>
                    <UserListPage />
                  </AdminOnlyRoute>
                }
              />
              <Route
                path="/create-user"
                element={
                  <PrivateRoute>
                    <CreateUserPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user/:username"
                element={
                  <PrivateRoute>
                    <UpdateUserPage />
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
