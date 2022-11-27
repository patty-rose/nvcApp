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
        to='/events'
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
      >
        Events
      </NavLink>
      <NavLink 
        to='/addEvent'
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
    </nav>
  );
};

export default StyledNavbar;