import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const SharedLayout = props => {
  const {user} = props;
  return (
    <>
      <Navbar currentUser = {user}/>
      <Outlet />
    </>
  );
};

SharedLayout.propTypes = {
  user : PropTypes.object
}

export default SharedLayout;