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
        to='/addEvent/addConflict'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Add Conflict Event
      </NavLink>

      {/* no user */}
      <NavLink 
        to='/login'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Login/Logout
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

export default Navbar;