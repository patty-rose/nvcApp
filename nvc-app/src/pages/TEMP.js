import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import PropTypes from 'prop-types'

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
    <div>
      <div className='max-w-[700px] mx-auto my-16 p-4'>
        <div>
          <h1 className='text-2xl font-bold py-2'>USER EMAIL: {user && user.email}</h1>
          <button 
            className = 'border px-6 py-2 my-4'
            onClick={handleLogout}
            >
              Logout
          </button>
        </div>
      </div>
    </div>
  )
}

TEMP.propTypes = {
  user : PropTypes.object
}

export default TEMP