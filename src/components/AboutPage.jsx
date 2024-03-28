import React from 'react';
import VersionInfoList from 'components/VersionInfoList';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

const AboutPage = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box m={1}>
        <VersionInfoList />
      </Box>
    </Grid>
  );
};
export default AboutPage;
