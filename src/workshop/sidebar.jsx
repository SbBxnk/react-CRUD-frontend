import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #ffffff; /* White background for sidebar */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height */
`;

const NavLink = styled(Link)`
  padding: 10px;
  color: #333; /* Dark text color */
  text-decoration: none;
  border-radius: 4px; /* Rounded corners */
  margin: 5px 0;
  &:hover {
    background-color: #f1f1f1; /* Light gray on hover */
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2 style={{ color: '#333' }}>Admin Dashboard</h2>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/reports">Reports</NavLink>
    </SidebarContainer>
  );
};

export default Sidebar;
