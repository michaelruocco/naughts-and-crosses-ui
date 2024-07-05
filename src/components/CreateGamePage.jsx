import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import GameApiClient from 'adapters/GameApiClient';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';

const CreateGamePage = () => {
  const [usernames, setUsernames] = useState([]);
  const [crossesPlayer, setCrossesPlayer] = useState(null);
  const [naughtsPlayer, setNaughtsPlayer] = useState(null);
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const { token } = useAuth();
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
          username: crossesPlayer,
          token: 'X',
        },
        {
          username: naughtsPlayer,
          token: 'O',
        },
      ],
    };

    try {
      const game = await gameClient.create(request);
      navigate(`/game/${game.id}`);
    } catch (e) {
      console.debug(e.message);
      setErrorMessage('Unable to create game');
    }
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernames = await gameClient.getAllCandidatePlayerUsernames();
      setUsernames(usernames);
    };
    fetchUsernames();
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
            options={usernames}
            //getOptionLabel={(username) => username}
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
            options={usernames}
            //getOptionLabel={(user) => toOptionLabel(user)}
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
