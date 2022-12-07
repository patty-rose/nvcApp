import { NavLink } from 'react-router-dom';

const StyledNavbar = () => {
  return (
    <nav className='navbar'>
      <NavLink 
        to='/' 
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
      >
        Home
      </NavLink>
      <NavLink 
        to='/conflictList'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
      >
        Conflicts
      </NavLink>
      <NavLink 
        to='/addConflict'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Add Conflict Event
      </NavLink>
      <NavLink 
        to='/login'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Login
      </NavLink>
      <NavLink 
        to='/SignUp'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Create an account
      </NavLink>
    </nav>
  );
};

export default StyledNavbar;