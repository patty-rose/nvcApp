import { Link } from 'react-router-dom';

const AddEvent = () => {
  return (
    <section className='section'>
      <h2>AddEvent</h2>
      <Link to='/' className='btn'>
        Back Home
      </Link>
    </section>
  );
};
export default AddEvent;