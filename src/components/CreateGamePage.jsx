import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import GamesApiClient from 'adapters/GamesApiClient';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const CreateGamePage = () => {
  const [users, setUsers] = useState([]);
  const [crossesPlayer, setCrossesPlayer] = useState(null);
  const [naughtsPlayer, setNaughtsPlayer] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const client = new GamesApiClient(accessToken);
  const navigate = useNavigate();

  const createGame = () => {
    const performCreateGame = async () => {
      setErrorMessage(null);
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
      const game = await client.create(request);
      navigate(`/game/${game.id}`);
    };
    performCreateGame();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await client.getAllUsers();
      console.log(`got all users from api ${users.map((g) => g.id)}`);
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
        </Box>
        {errorMessage ? (
          <Box m={1} textAlign="center">
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        ) : null}
      </Grid>
    </>
  );
};
export default CreateGamePage;
