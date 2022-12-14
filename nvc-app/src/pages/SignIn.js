import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinErrorMessage, setSigninErrorMessage] = useState('');
  const [signoutErrorMessage, setSignoutErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigninErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/conflictList')
    } catch (e) {
      setSigninErrorMessage(`There was an error signing in: ${e.message}`);
    }
  };

  const handleLogout = async () => {
    setSignoutErrorMessage('');
    try {
      await signOut(auth);
      navigate('/');
    } catch (e) {//current error handling does not catch and alert unsuccessful logouts
      setSignoutErrorMessage(`There was an error signing out: ${e.message}`);
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
              onClick={handleLogout}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Out
            </Button>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {signinErrorMessage}
            <Grid container>
              <Grid item>
                <Link to='/signUp' className='underline'> "Don't have an account? Sign up.</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default SignIn