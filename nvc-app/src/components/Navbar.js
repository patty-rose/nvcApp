import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = props => {
  const {currentUser} = props;
  const [navbarLinks, setNavbarLinks] = useState([]);

  const authenticatedLinks = [['Home', '/'], ['Conflicts', '/conflictList'], ['Add Conflict Event', '/addEvent'], ['Sign In / Sign Out', '/signIn'], ['Sign Up', '/signUp']];
  const anonymousLinks = [['Home', '/'], ['Sign In / Sign Out', '/signIn'], ['Sign Up', '/signUp']];

  useEffect(() => {
    if(currentUser){
      setNavbarLinks(authenticatedLinks);
    } else {
      setNavbarLinks(anonymousLinks);
    }
  }, [currentUser]);

  return (
    <nav className='navbar'>
      {navbarLinks.map((navbarLink) => (
        <NavLink 
        key={navbarLink[0]}
        to={navbarLink[1]}
        className={({ isActive }) => (isActive ? 'link active' : 'link' )}
        >
          {navbarLink[0]}
        </NavLink>
      ))}
    </nav>
  );
};

Navbar.propTypes = {
  currentUser : PropTypes.object
}

export default Navbar;