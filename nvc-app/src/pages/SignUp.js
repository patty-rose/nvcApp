import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try{ 
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/ConflictList');
    } catch (e) {
      setError(`There was an error signing up: ${e.message}`);
    } 
  }

  return (
    <React.Fragment>
      <h1>Join Venter</h1>
      {error}
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