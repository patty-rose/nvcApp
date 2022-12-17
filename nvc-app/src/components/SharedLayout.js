import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Appbar from './Appbar';
import PropTypes from 'prop-types';

const SharedLayout = props => {
  const {user} = props;
  return (
    <>
      <Appbar currentUser = {user}/>
      <Outlet />
    </>
  );
};

SharedLayout.propTypes = {
  user : PropTypes.object
}

export default SharedLayout;