import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';



const authenticatedPages = [['conflicts', 'conflictList'], ['create conflict', '/addEvent']];
const authenticatedAccountButtons = [['Log Out', '/signIn', '() => {handleLogout}']];
const anonAccountButtons = [['Log In', '/signIn'], ['Join', '/signUp']];

const Appbar = props => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [pages, setPages] = useState([]);
  const [accountButtons, setAccountButtons] = useState([])
  const {currentUser} = props;


  useEffect(() => {
    if(currentUser){
      setPages(authenticatedPages);
      setAccountButtons(authenticatedAccountButtons);
    } else {
      setPages([]);
      setAccountButtons(anonAccountButtons);
    }
  }, [currentUser]);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {//current error handling does not catch and alert unsuccessful logouts
      console.log(`There was an error signing out: ${e.message}`);
    }
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* LOGO AND NAME -- WIDE SCREEN LEFT ALLIGHNED */}
          <QuestionAnswerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Venter
          </Typography>

          {/* DROP DOWN ICON AND TABS - SMALL WIDTH LEFT ALIGNED*/}
          {/* NEED TO HIDE DROP DOWN MENU WHEN AUTHENTICATED AND MED SCREEN WIDTH */}
          <Box sx={{ 
            flexGrow: 0, 
            display: currentUser ? `xs: 'flex', md: 'none'` : `none`
             }}>
            <IconButton
              size="large"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              display= {`xs: 'flex', md: 'none'`}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: currentUser ? `xs: 'flex', md: 'none'` : `none`
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link 
                    style={{ 
                      textDecoration: 'none', 
                      color: 'inherit'}} 
                      to={page[1]} >
                      {page[0]}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO AND TITLE -- SMALL WIDTH CENTER ALIGNED */}
          <QuestionAnswerIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            href="/"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Venter
          </Typography>

            {/* NAVBAR TABS -- WIDE VIEW CENTER ALIGNED */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: 'white', display: 'block' }}
              >
                <Link 
                  style={{ 
                    textDecoration: 'none', 
                    color:'#1c2020'}} 
                  to={page[1]} >
                    {page[0]}
                </Link>
              </Button>
            ))}
          </Box>

          {/* ACCOUNT MENU-- RIGHT ALIGNED: */}
          <Box sx={{ flexGrow: 0 }}>
            {accountButtons.map((accountButton) => (
              <Button
                key={accountButton}
                sx={{ my: 1, color: 'white' }}
                onClick={handleLogout}
              >
                <Link 
                  style={{ 
                    textDecoration: 'none', 
                    color:'#1c2020'}} 
                  to={accountButton[1]} >
                    {accountButton[0]}
                </Link>
              </Button>
            )
            )}
            {/* <Button
                sx={{ my: 0, color: 'white'}}
              >
                <Link 
                    style={{ 
                      textDecoration: 'none', 
                      color:'#1c2020'}} 
                      to='/signIn' >
                      Log in
                    </Link>
              </Button>
              <Button
                sx={{ my: 0, color: 'white'}}
              >
                <Link 
                    style={{ 
                      textDecoration: 'none', 
                      color:'#1c2020'}} 
                      to='/signUp' >
                      Join
                    </Link>
              </Button> */}
            {/* <Typography>Hello {currentUser?.email}</Typography>
            <Tooltip title="account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon style={{color:'#1c2020'}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {accountTabs.map((accountTab) => (
                <MenuItem key={accountTab} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link 
                    style={{ textDecoration: 'none', color:'#1c2020'}} 
                    to= {accountTab[1]} 
                    onClick = {accountTab[2]}>
                      {accountTab[0]}
                    </Link>
                    </Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Appbar.propTypes = {
  currentUser : PropTypes.object
}

export default Appbar;