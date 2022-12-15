import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Splash = () => {
  return (
    <Container>
      <Typography variant='h2'>Welcome to Venter</Typography>
      <Typography variant='body'>Venter helps you manage conflicts by guiding you through describing what happened and how you felt, identifying any unment needs you may have, and drafting statements you can say to those you are in conflict with.
      </Typography>
      <Link to={`/signIn`} className='btn'>
      Join Venter or Login now!</Link>
    </Container>
  );
};
export default Splash;