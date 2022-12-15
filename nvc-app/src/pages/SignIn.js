import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

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
      <div className='max-w-[700px] mx-auto my-1 p-4'>
        <div>
          <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
          <p className='py-2'>
            Don't have an account yet?{' '}
            <Link to='/signUp' className='underline'>
              Sign up.
            </Link>
          </p>
        </div>
        <p>{signinErrorMessage}</p>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='border p-3'
                type='text'
                name='signinEmail'
                placeholder='email' />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='border p-3'
              type='password'
              name='signinPassword'
              placeholder='Password' />
          </div>
          <button 
            className='btn'
            type='submit'>
              Sign in
          </button>
        </form>
        <div>
          <p>{signinErrorMessage}</p>
          <p>{signoutErrorMessage}</p>
          <button onClick={handleLogout} className='btn'>
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignIn