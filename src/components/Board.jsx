import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';

const Board = (props) => {
  const { board, onLocationSelected } = props;

  const toGridLocationContent = (token) => {
    if (token === ' ') {
      return '\u00A0'; //&nbsp;
    }
    return token;
  };

  if (!board) {
    return null;
  }

  return (
    <>
      <Box mx={15}>
        <Grid
          container
          direction="row"
          columns={board.size}
          spacing={2}
          rowSpacing={2}
        >
          {board.locations.map((location) => (
            <Grid item key={JSON.stringify(location.coordinates)} xs={1}>
              <Card>
                <CardActionArea onClick={() => onLocationSelected(location)}>
                  <CardContent>
                    <Typography
                      sx={{ typography: { sm: 'h1', xs: 'h2' } }}
                      align="center"
                    >
                      {toGridLocationContent(location.token)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default Board;
