import React from 'react';
import { Box } from '@mui/system';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const GameFilters = (props) => {
  const { complete, onCompleteChange, onClear, onClose } = props;

  return (
    <Box component="form" m={2}>
      <Box textAlign="center">
        <FormControl>
          <FormLabel id="game-status-group-label">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="game-status-group-label"
            name="game-status-radio-buttons-group"
            value={complete}
            onChange={onCompleteChange}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="In Progress"
            />
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Complete"
            />
            <FormControlLabel value={''} control={<Radio />} label="All" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box m={1} textAlign="center">
        <ButtonGroup>
          <Button variant="contained" onClick={onClear}>
            Clear
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
export default GameFilters;
