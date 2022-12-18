import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CustomButton from '../components/CustomButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import splashImage from '../img/splash.png';

const Splash = () => {
  const navigate = useNavigate();
  const handleJoinClick = () => {
    navigate('/signUp');
  }
  return (
    <Container>
      <Grid container sx={{width: '90%', mr: 5, ml: 5, mt: 1}}>
        <Grid item xs={6} sx={{alignSelf: 'center'}}>
          <Typography variant='h2'>Welcome to Venter</Typography>
          <Typography variant='body'>Venter helps you manage conflicts by guiding you through describing what happened and how you felt, identifying any unment needs you may have, and drafting statements you can say to those you are in conflict with. Get started now!
          </Typography>
          <Grid container justifyContent='space-around'>
            <Grid item sx={{mt: 2}}>
              <CustomButton  onClickFunction={()=>{handleJoinClick()}} buttonText="Join Venter" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}  sx={{alignSelf: 'center'}}> 
          <Box
            component="img"
            sx={{
              height: 'auto',
              width: '100%',
            }}
            alt="Two people shaking hands sitting close togehter at a table"
            src={splashImage}
          />
        </Grid>
      </Grid>
      
    </Container>
  );
};
export default Splash;