import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import PropTypes from 'prop-types'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TEMP = props => {
  const {user} = props;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Container>
      <Typography variant='h4'>USER EMAIL: {user && user.email}</Typography>
      <Button color='primary' variant='contained'
        onClick={handleLogout}
        >
          Logout
      </Button>
    </Container>
  )
}

TEMP.propTypes = {
  user : PropTypes.object
}

export default TEMP