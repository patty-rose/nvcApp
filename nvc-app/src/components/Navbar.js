import { Link, NavLink } from 'react-router-dom';
import {Grid, AppBar, Toolbar, Typography} from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
    <AppBar>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <Typography>
              <QuestionAnswerIcon />
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Tabs indicatorColor ="secondary" textColor="inherit" value={tabValue} onChange={(e, val) => setTabValue(val)}>
              <Link to={`/conflictList`}>
              <Tab label='Conflicts' /></Link>
              <Link to={`/addEvent`}>
              <Tab label='Add Conflict' /></Link>
              <Link to={`/signIn`}>
              <Tab label='Sign In' /></Link>
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>



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

        <NavLink 
          to='/account'
          className={({ isActive }) => (isActive ? 'link active' : 'link' )}
          >
            ACCOUNT
        </NavLink>

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
    </>
  );
};

Navbar.propTypes = {
  currentUser : PropTypes.object
}

export default Navbar;