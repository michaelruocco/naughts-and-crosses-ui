import React, { useState, useEffect } from 'react';
import UserApiClient from 'adapters/UserApiClient';
import { useAuth } from '../hooks/AuthProvider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const UserGroupAutocomplete = (props) => {
  const { selectedGroups, disabled, onGroupsChange } = props;
  const [groupOptions, setGroupOptions] = useState([]);

  const { accessToken } = useAuth();
  const client = new UserApiClient(accessToken);

  const handleGroupsChange = (event, value) => {
    onGroupsChange(value);
  };

  const fetchGroups = async () => {
    const groups = await client.getAllGroups();
    setGroupOptions(groups);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Autocomplete
      id="groups"
      name="groups"
      label="Groups"
      disabled={disabled}
      multiple={true}
      options={groupOptions}
      value={selectedGroups}
      renderInput={(params) => (
        <TextField {...params} label="Groups" sx={{ minWidth: 350 }} />
      )}
      onChange={handleGroupsChange}
    />
  );
};
export default UserGroupAutocomplete;
