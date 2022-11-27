import { Link } from 'react-router-dom';

const Event = () => {
  return (
    <section className='section'>
      <h2>Event</h2>
      <Link to='/' className='btn'>
        Back Home
      </Link>
    </section>
  );
};
export default Event;