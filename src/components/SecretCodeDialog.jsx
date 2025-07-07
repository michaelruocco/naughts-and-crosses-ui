import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SecretCodeDialog(props) {
  const { open, onClose, secretCode } = props;
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="secret-code-dialog-title"
        aria-describedby="secret-code-dialog"
      >
        <DialogTitle id="secret-code-dialog-title">
          Your two-factor secret
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="secret-code-dialog">
            {secretCode}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}