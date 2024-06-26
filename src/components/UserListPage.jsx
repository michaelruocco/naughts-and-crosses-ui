import React, { useState, useEffect, useRef } from 'react';
import UserList from 'components/UserList';
import Button from '@mui/material/Button';
import UserApiClient from 'adapters/UserApiClient';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useAuth } from '../hooks/AuthProvider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import AlertSnackbar from './AlertSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const batchRef = useRef(null);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const closedSnackState = {
    open: false,
    message: '',
    severity: '',
  };
  const [snackState, setSnackState] = useState(closedSnackState);
  const { token } = useAuth();
  const client = new UserApiClient(token);

  const closeSnackbar = () => {
    setSnackState(closedSnackState);
  };

  const setErrorMessage = (message) => {
    setSnackState({ open: true, message: message, severity: 'error' });
  };

  const setSuccessMessage = (message) => {
    setSnackState({ open: true, message: message, severity: 'success' });
  };

  const fetchUsers = async () => {
    const users = await client.getAllUsers();
    setUsers(users);
  };

  const calculateProgress = (batch) => {
    const completeCount = batch.users.length + batch.errors.length;
    return (completeCount / batch.requests.length) * 100;
  };

  const shouldDisplayProgressBar = () => {
    return uploadProgress > 0 && uploadProgress < 100;
  };

  const checkBatchStatus = async (id) => {
    let batch = await client.getBatch(id);
    setUploadProgress(calculateProgress(batch));
    if (!batch.complete) {
      return;
    }
    if (batch.errors.length > 0) {
      setErrorMessage(
        batch.errors
          .map((error) => `${error.username} - ${error.message}`)
          .join('\r\n'),
      );
    } else {
      setSuccessMessage(`${batch.requests.length} users uploaded successfully`);
    }
    clearInterval(batchRef.current);
    setUploadInProgress(false);
    fetchUsers();
  };

  const handleFileSelected = async (event) => {
    closeSnackbar();
    const files = Array.from(event.target.files);
    const batch = await client.uploadBatch(files[0]);
    if (batch.complete) {
      return;
    }
    setUploadInProgress(true);
    batchRef.current = setInterval(() => {
      checkBatchStatus(batch.id);
    }, 1000);
  };

  const handleDeleteUser = async (username) => {
    await client.delete(username);
    fetchUsers();
  };

  const handleUpdateUser = async (username) => {
    navigate(`/user/${username}`);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Box m={5} textAlign="center">
        <ButtonGroup variant="contained">
          <Button variant="contained" component={Link} to="/create-user">
            Create User
          </Button>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            disabled={uploadInProgress}
          >
            Upload users
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileSelected}
              accept="text/csv"
            />
          </Button>
        </ButtonGroup>
        {shouldDisplayProgressBar() && (
          <Box m={5} textAlign="center">
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
        <AlertSnackbar
          open={snackState.open}
          severity={snackState.severity}
          message={snackState.message}
          onClose={closeSnackbar}
        />
      </Box>
      <UserList
        users={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </>
  );
};
export default UserListPage;
