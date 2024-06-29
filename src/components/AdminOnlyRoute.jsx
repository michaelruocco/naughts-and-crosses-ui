import GroupSpecificRoute from './GroupSpecificRoute';

const AdminOnlyRoute = ({ children }) => {
  return <GroupSpecificRoute permittedGroups={['admin']} children={children} />;
};
export default AdminOnlyRoute;
