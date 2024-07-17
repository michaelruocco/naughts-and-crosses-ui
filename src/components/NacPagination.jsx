import React from 'react';
import { Box } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const NacPagination = (props) => {
  const { currentPage, pageSize, totalItems, onPageSelected } = props;
  const numberOfPages = Math.ceil(totalItems / pageSize);
  if (numberOfPages < 2) {
    return <></>;
  }

  const handleChange = (event, value) => {
    onPageSelected(value);
  };
  return (
    <>
      <Box m={2}>
        <Stack spacing={2} alignItems="center">
          <Pagination
            page={currentPage}
            count={numberOfPages}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </>
  );
};
export default NacPagination;
