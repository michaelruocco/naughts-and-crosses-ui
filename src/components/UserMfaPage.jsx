import React, { useState, useEffect } from 'react';
import UserApiClient from 'adapters/UserApiClient';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import AlertSnackbar from './AlertSnackbar';
import { useAuth } from '../hooks/AuthProvider';
import { useParams } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import UserListButton from './UserListButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const UpdateUserPage = () => {
  const { username } = useParams();
  const closedSnackState = {
    open: false,
    message: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);

  const { accessToken } = useAuth();
  const client = new UserApiClient(accessToken);
  const navigate = useNavigate();

  const closeSnackbar = () => {
    setSnackState(closedSnackState);
  };

  const setErrorMessage = (message) => {
    setSnackState({ open: true, message: message });
  };

  const setSuccessMessage = (message) => {
    setSnackState({ open: true, message: message, severity: 'success' });
  };

  const handleMfaEnabledChanged = (event) => {
    setSaveEnabled(true);
    setMfaEnabled(event.target.checked);
  };

  const handleSubmit = async () => {
    closeSnackbar();
    try {
      const request = {
        softwareToken: {
          enabled: mfaEnabled,
          preferred: mfaEnabled
        }
      }
      const user = await client.updateMfaSettings(username, request);
      setSuccessMessage(`MFA settings updated successfully`);
      navigate(`/user/${username}`);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    const fetchUserMfaSettings = async () => {
      const settings = await client.getMfaSettings(username);
      setMfaEnabled(settings.softwareToken.enabled);
    };
    fetchUserMfaSettings();
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <ButtonGroup>
        <UserListButton />
        <Button variant="contained" component={Link} to={`/user/${username}`}>
          {username}
        </Button>
      </ButtonGroup>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 1 }}>
          <FormControlLabel
            id="mfaEnabled"
            name="mfaEnabled"
            label="MFA Enabled" 
            disabled={!mfaEnabled}
            control={<Switch checked={mfaEnabled} onChange={handleMfaEnabledChanged} />}
          />
        </Box>
        <Box m={1} textAlign="center">
          <Button variant="contained" type="submit" disabled={!saveEnabled}>
            Save
          </Button>
        </Box>
      </Box>
      <AlertSnackbar
        open={snackState.open}
        severity={snackState.severity}
        message={snackState.message}
        onClose={closeSnackbar}
      />
    </Grid>
  );
};
export default UpdateUserPage;
