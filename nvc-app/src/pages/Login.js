import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, logout, user } = UserAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/conflictList')
    } catch (e) {
      setError(`There was an error signing in: ${e.message}`);
      console.log(e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
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
        <p>{error}</p>
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
            className='border border-blue-500 bg-blue-600 hover:bg-blue-500 p-1 my-1 text-white'
            type='submit'>
              Sign in
          </button>
        </form>
        <div>
          <button onClick={handleLogout} className='border border-blue-500 bg-blue-600 hover:bg-blue-500 p-1 my-1 text-white'>
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login