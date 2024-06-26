import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import UserApiClient from 'adapters/UserApiClient';
import GameApiClient from 'adapters/GameApiClient';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';

const CreateGamePage = () => {
  const [users, setUsers] = useState([]);
  const [crossesPlayer, setCrossesPlayer] = useState(null);
  const [naughtsPlayer, setNaughtsPlayer] = useState(null);
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const { token } = useAuth();
  const userClient = new UserApiClient(token);
  const gameClient = new GameApiClient(token);
  const navigate = useNavigate();

  const closeSnackbar = () => {
    setSnackState(closedSnackState);
  };

  const setErrorMessage = (message) => {
    setSnackState({ open: true, message: message });
  };

  const createGame = async () => {
    closeSnackbar();
    if (!crossesPlayer || !naughtsPlayer) {
      setErrorMessage('Both players must be selected to create a game');
      return;
    }

    const request = {
      requestedPlayers: [
        {
          username: crossesPlayer.username,
          token: 'X',
        },
        {
          username: naughtsPlayer.username,
          token: 'O',
        },
      ],
    };
    const game = await gameClient.create(request);
    navigate(`/game/${game.id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userClient.getAllUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const autoCompleteWidth = 300;

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box m={1}>
          <Autocomplete
            disablePortal
            id="crosses-player"
            sx={{ width: autoCompleteWidth }}
            options={users}
            getOptionLabel={(user) => user.fullName}
            renderInput={(params) => (
              <TextField {...params} label="Crosses Player" />
            )}
            onChange={(event, value) => setCrossesPlayer(value)}
          />
        </Box>
        <Box m={1}>
          <Autocomplete
            disablePortal
            id="naughts-player"
            sx={{ width: autoCompleteWidth }}
            options={users}
            getOptionLabel={(user) => user.fullName}
            renderInput={(params) => (
              <TextField {...params} label="Naughts Player" />
            )}
            onChange={(event, value) => setNaughtsPlayer(value)}
          />
        </Box>
        <Box m={1} textAlign="center">
          <Button variant="contained" onClick={createGame}>
            Create
          </Button>
          <AlertSnackbar
            open={snackState.open}
            message={snackState.message}
            onClose={closeSnackbar}
          />
        </Box>
      </Grid>
    </>
  );
};
export default CreateGamePage;
