import { Navigate } from 'react-router-dom';
import GroupSpecificComponent from './GroupSpecificComponent';

const GroupSpecificRoute = (props) => {
  const { permittedGroups } = props;
  return (
    <GroupSpecificComponent
      permittedGroups={permittedGroups}
      children={props.children}
      defaultNotPermitted={<Navigate replace to="/" />}
    />
  );
};
export default GroupSpecificRoute;
