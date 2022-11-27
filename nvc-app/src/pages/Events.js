import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <section className='section'>
      <h2>Events</h2>
      <Link to='/' className='btn'>
        Back Home
      </Link>
    </section>
  );
};
export default Events;