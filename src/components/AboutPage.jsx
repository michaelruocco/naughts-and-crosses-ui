import React, { useState, useEffect } from 'react';
import PublicApiClient from 'adapters/PublicApiClient';
import VersionInfoList from 'components/VersionInfoList';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

const AboutPage = () => {
  const [apiInfo, setApiInfo] = useState(null);
  const client = new PublicApiClient();

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
