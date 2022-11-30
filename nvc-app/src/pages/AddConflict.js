import { useNavigate } from 'react-router-dom';
import React from "react";
import PropTypes from "prop-types"; 

function AddConflict(props) {

  const navigate = useNavigate();

  function handleAddConflictFormSubmission(event) {
    event.preventDefault();
    props.onNewConflictCreation({
      description: event.target.description.value, 
      feeling: event.target.feeling.value, 
      need: event.target.need.value,
      needsStatement: null,
      apologyStatemnet: null
    });

    navigate(`/conflictList`);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleAddConflictFormSubmission}>
        <textarea
          name='description'
          placeholder='Describe what happened' />
        <input
          type='text'
          name='feeling'
          placeholder='How did that make you feel?' />
        <textarea
          name='need'
          placeholder='What do you need in the future?' />
        <button
        type='submit'>Submit</button>
      </form>
    </React.Fragment>
  );
}

AddConflict.propTypes = {
  onNewConflictCreation: PropTypes.func
};

export default AddConflict;