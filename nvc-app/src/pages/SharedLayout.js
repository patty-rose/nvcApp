import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropTypes from 'prop-types';

const SharedLayout = props => {
  const {user} = props;

  return (
    <>
      <Navbar currentUser={user}/>
      <Outlet />
    </>
  );
};

SharedLayout.propTypes = {
  user : PropTypes.object
}

export default SharedLayout;