import React, { useState, useEffect } from 'react';
import GamesApiClient from 'adapters/GamesApiClient';
import { useKeycloak } from '@react-keycloak/web';
import VersionInfoListItem from 'components/VersionInfoListItem';
import List from '@mui/material/List';

const VersionInfo = () => {
  const [apiInfo, setApiInfo] = useState(null);
  const { keycloak } = useKeycloak();
  const client = new GamesApiClient(keycloak.token);

  useEffect(() => {
    const fetchInfo = async () => {
      console.log
      const info = await client.getApiInfo();
      console.log(`got api info ${JSON.stringify(info)}`);
      setApiInfo(info);
    };
    fetchInfo();
  }, []);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <VersionInfoListItem label='UI Version' value='blah' />
      <VersionInfoListItem label='UI Commit ID' value='blah' />
      {apiInfo && 
        <>
          <VersionInfoListItem label='API Version' value={apiInfo.build.version} />
          <VersionInfoListItem label='API Commit ID' value={apiInfo.git.commit.id} />
        </>
      }
    </List>
  )
};
export default VersionInfo;
