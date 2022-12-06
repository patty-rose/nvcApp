import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from '../firebase';

const Navbar = () => {

  const { user } = useAuthState();
  console.log(user);

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
      <button onClick={() => signOut(getAuth())}>Sign out</button>
    </nav>
  );
};

export default Navbar;