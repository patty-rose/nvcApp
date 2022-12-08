import React, { useState } from "react";
import { UserAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpError, setSignUpError] = useState(null);
  const {createUser} = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{ 
      await createUser(email, password);
      navigate('/ConflictList');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setSignUpError(`There was an error signing up: ${e.message}`)
    } 
  }

  return (
    <React.Fragment>
      <h1>Join Venter</h1>
      {signUpError}
      <form onSubmit={handleSubmit}>
        <label className='py-2 font-medium'>Email Address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className='border p-3'
          type='text'
          name='email'
          placeholder='email' />
        <label className='py-2 font-medium'>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className='border p-3'
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>
    </React.Fragment>
  );
}

export default SignUp