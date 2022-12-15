import { Link } from 'react-router-dom';

const Splash = () => {
  return (
    <section className='section'>
      <h2>Welcome to Venter</h2>
      <h4>***IN DEVELOPMENT***</h4>
      <p>Venter helps you manage conflicts by guiding you through describing what happened and how you felt, identifying any unment needs you may have, and drafting statements you can say to those you are in conflict with.
      </p>
      <Link to={`/signUp`} className='btn'>
      Join Venter or Login now!</Link>
    </section>
  );
};
export default Splash;