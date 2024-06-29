import { useAuth } from '../hooks/AuthProvider';

const GroupSpecificComponent = (props) => {
  const { permittedGroups, defaultNotPermitted } = props;
  const { userIsMemberOfAtLeastOne } = useAuth();
  if (userIsMemberOfAtLeastOne(permittedGroups)) {
    return props.children;
  }
  return defaultNotPermitted || <></>;
};
export default GroupSpecificComponent;
