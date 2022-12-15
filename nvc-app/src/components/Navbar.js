import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = props => {
  const {currentUser} = props;

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
        to={currentUser ? '/conflictList' : '/signIn'}
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
      >
        Conflicts
      </NavLink>
      <NavLink 
        to={currentUser ? '/addEvent' : '/signIn'}
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          Add Conflict Event
      </NavLink>`

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

Navbar.propTypes = {
  currentUser : PropTypes.object
}

export default Navbar;