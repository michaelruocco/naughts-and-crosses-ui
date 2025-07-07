import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Link from '@mui/material/Link';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../hooks/AuthProvider';
import UserApiClient from 'adapters/UserApiClient';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SecretCodeDialog from 'components/SecretCodeDialog';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const UserSettingsPage = () => {
  const [secretCode, setSecretCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [softwareTokenEnabled, setSoftwareTokenEnabled] = useState('');
  const [secretCodeDialogOpen, setSecretCodeDialogOpen] = useState(false);
  const { accessToken, user } = useAuth();

  const client = new UserApiClient(accessToken);

  const handleUserCodeChange = event => {
    setUserCode(event.target.value);
  };

  const fetchSecretCode = async () => {
    const response = await client.createSoftwareToken();
    setSecretCode(response.secretCode);
  };

  const fetchMfaSettings = async () => {
    const response = await client.getMfaSettings();
    setSoftwareTokenEnabled(response.softwareToken.enabled);
  };

  const verifyUserCode = async () => {
    try {
      await client.verifySoftwareToken(userCode);
    } catch (e) {
      //TODO present error to user
      console.error(e);
    }
  };

  const handleSoftwareTokenEnabledChange = async (event) => {
    const enabled = event.target.checked;
    const request = {
      softwareToken: {
        enabled,
        preferred: enabled
      }
    };
    await client.updateMfaSettings(request);
    await fetchMfaSettings();
  };

  useEffect(() => {
    fetchSecretCode();
  }, []);

  useEffect(() => {
    fetchMfaSettings();
  }, []);
  return (<>
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Two-factor authentication
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="auth-app-content"
            id="auth-app-header"
          >
            <Typography component="span" sx={{ fontWeight: 'bold' }}>Authenticator App</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <FormControlLabel control={<Switch checked={softwareTokenEnabled} onChange={handleSoftwareTokenEnabledChange} />} label="Enabled" />
            </Box>
            <Typography>
              Authenticator apps and browser extensions like <Link href="https://support.1password.com/one-time-passwords/?mac" target="_blank" rel="noreferrer">1Password</Link>, <Link href="https://www.authy.com/" target="_blank" rel="noreferrer">Authy</Link>, <Link href="https://www.microsoft.com/en-us/security/mobile-authenticator-app" target="_blank" rel="noreferrer">Microsoft Authenticator</Link>, etc. generate one-time passwords that are used as a second factor to verify your identity when prompted during sign-in.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h7">
                Scan the QR Code
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography>
                Use an authenticator app or browser extension to scan.
              </Typography>
              <Box sx={{ my: 3 }}>
                <QRCodeSVG value={`otpauth://totp/NACApp:${user.username}?secret=${secretCode}&issuer=Cognito`} marginSize={4} title='NAC 2FA Code' level='M' />
              </Box>
              <Typography>
                Unable to scan? You can enter the <Link onClick={() => setSecretCodeDialogOpen(true)}>setup code</Link> to manually configure your authenticator app.
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h7">
                Verify the code from the app
              </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField id="userCode" name="userCode" placeholder="XXXXXX" onChange={handleUserCodeChange} />
            </Box>
            <Box>
              <Button variant="contained" onClick={() => verifyUserCode()}>
                Save
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Grid>
    <SecretCodeDialog open={secretCodeDialogOpen} onClose={() => setSecretCodeDialogOpen(false)} secretCode={secretCode} />
  </>);
};
export default UserSettingsPage;
