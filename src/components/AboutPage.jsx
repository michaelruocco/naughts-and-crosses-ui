import React, { useState, useEffect } from 'react';
import GamesApiClient from 'adapters/GamesApiClient';
import VersionInfoList from 'components/VersionInfoList';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

const AboutPage = () => {
  const [apiInfo, setApiInfo] = useState(null);
  const accessToken = sessionStorage.getItem('accessToken');
  const client = new GamesApiClient(accessToken);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await client.getApiInfo();
      setApiInfo(info);
    };
    fetchInfo();
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box m={1}>
        <VersionInfoList apiInfo={apiInfo} />
      </Box>
    </Grid>
  );
};
export default AboutPage;
