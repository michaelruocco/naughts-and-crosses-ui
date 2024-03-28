import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const VersionInfoListItem = (props) => {
  const { label, value } = props;
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={label}
        secondary={
          <React.Fragment>
            {value}
          </React.Fragment>
        }
      />  
    </ListItem>
  );
};
export default VersionInfoListItem;
