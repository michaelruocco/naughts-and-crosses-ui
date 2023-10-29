import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';

const Board = (props) => {
  const { board, onLocationSelected } = props;

  const toFormattedToken = (location) => {
    if (location.token === ' ') {
      return '\u00A0'; //&nbsp;
    }
    return location.token;
  };

  const isAvailable = (location) => {
    return location.token === ' ';
  };

  const toAvailableContent = (location) => {
    return (
      <CardActionArea onClick={() => onLocationSelected(location)}>
        {toContent(location)}
      </CardActionArea>
    );
  };

  const toUnavailableContent = (location) => {
    return toContent(location);
  };

  const toContent = (location) => {
    return (
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Typography sx={{ typography: { sm: 'h1', xs: 'h2' } }} align="center">
          {toFormattedToken(location)}
        </Typography>
      </CardContent>
    );
  };

  const toCardContent = (location) => {
    if (isAvailable(location)) {
      return toAvailableContent(location);
    }
    return toUnavailableContent(location);
  };

  return (
    <>
      <Box mx={25}>
        <Grid
          container
          direction="row"
          columns={board.size}
          spacing={2}
          rowSpacing={2}
        >
          {board.locations.map((location) => (
            <Grid item key={JSON.stringify(location.coordinates)} xs={1}>
              <Card>{toCardContent(location)}</Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default Board;
