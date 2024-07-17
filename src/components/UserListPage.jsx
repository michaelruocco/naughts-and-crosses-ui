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
import NacPagination from 'components/NacPagination';
import FilterMenuButton from 'components/FilterMenuButton';

const UserListPage = () => {
  const pageSize = 10;
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGroups, setFilterGroups] = useState([]);

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
  const { accessToken } = useAuth();
  const client = new UserApiClient(accessToken);

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
    const page = await client.getPage(pageSize, offset, filterGroups);
    setUsers(page.users);
    setTotalUsers(page.total);
    if (offset >= page.total) {
      setOffset(page.total - pageSize);
    }
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
    try {
      const batch = await client.uploadBatch(files[0]);
      if (batch.complete) {
        return;
      }
      setUploadInProgress(true);
      batchRef.current = setInterval(() => {
        checkBatchStatus(batch.id);
      }, 1000);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const handleDeleteUser = async (username) => {
    await client.delete(username);
    fetchUsers();
  };

  const handleUpdateUser = async (username) => {
    navigate(`/user/${username}`);
  };

  const synchronizeExternalUsers = async () => {
    await client.synchronizeExternalUsers();
    fetchUsers();
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

  const toOffset = (pageNumber) => {
    return (pageNumber - 1) * pageSize;
  };

  const handlePageSelected = (pageNumber) => {
    const newOffset = toOffset(pageNumber);
    setOffset(newOffset);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchUsers();
  }, [offset, filterGroups]);

  return (
    <>
      <Box m={2} textAlign="center">
        <ButtonGroup>
          <Button variant="contained" component={Link} to="/create-user">
            Create User
          </Button>
          <Button variant="contained" onClick={synchronizeExternalUsers}>
            Sync External Users
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
      </Box>
      <Box m={2} textAlign="center">
        <ButtonGroup>
          <FilterMenuButton
            popoverId="user-groups-popover"
            buttonText="Filter Groups"
            filterValues={filterGroups}
            onFilterChange={setFilterGroups}
          />
        </ButtonGroup>
      </Box>
      <NacPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalUsers}
        onPageSelected={handlePageSelected}
      />
      <UserList
        users={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
      <NacPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalUsers}
        onPageSelected={handlePageSelected}
      />
      <AlertSnackbar
        open={snackState.open}
        severity={snackState.severity}
        message={snackState.message}
        onClose={closeSnackbar}
      />
    </>
  );
};
export default UserListPage;
