import GroupSpecificComponent from './GroupSpecificComponent';

const AdminOnlyComponent = ({ children }) => {
  return (
    <GroupSpecificComponent permittedGroups={['admin']} children={children} />
  );
};
export default AdminOnlyComponent;
