import React from 'react';
import VersionInfoListItem from 'components/VersionInfoListItem';
import List from '@mui/material/List';

const VersionInfo = (props) => {
  const { apiInfo } = props;
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <VersionInfoListItem label="UI Version" value={`${APP_VERSION}`} />
      <VersionInfoListItem
        label="UI Commit Hash"
        value={`${APP_COMMIT_HASH}`}
      />
      {apiInfo && (
        <>
          <VersionInfoListItem
            label="API Version"
            value={apiInfo.build.version}
          />
          <VersionInfoListItem
            label="API Commit Hash"
            value={apiInfo.git.commit.id}
          />
        </>
      )}
    </List>
  );
};
export default VersionInfo;
