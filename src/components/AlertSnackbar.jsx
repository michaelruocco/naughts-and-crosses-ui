import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function AlertSnackbar(props) {
  const { open, message, onClose, severity, autoHideDuration } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || 5000}
      onClose={handleClose}
    >
      <Alert
        severity={severity || 'error'}
        sx={{ width: '100%', whiteSpace: 'pre-line' }}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
export default AlertSnackbar;
