import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <NavLink 
        to='/' 
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
      >
        Home
      </NavLink>

      {/* user */}
      <NavLink 
        to='/conflictList'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
      >
        Conflicts
      </NavLink>
      <NavLink 
        to='/addEvent'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Add Conflict Event
      </NavLink>

      {/* no user */}
      <NavLink 
        to='/signIn'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Sign in/Logout
      </NavLink>
      <NavLink 
        to='/signUp'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Create an account
      </NavLink>
    </nav>
  );
};

export default Navbar;