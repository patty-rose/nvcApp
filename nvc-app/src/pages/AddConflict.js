import { useNavigate } from 'react-router-dom';
import React from "react";
import PropTypes from "prop-types";

function AddConflict(props) {

  const navigate = useNavigate();

  function handleAddConflictFormSubmission(event) {
    event.preventDefault();
    // const thisTimeStamp = toDate(serverTimestamp());
    props.onNewConflictCreation({
      title: event.target.title.value,
      description: event.target.description.value, 
      feeling: event.target.feeling.value, 
      need: event.target.need.value,
      needsStatement: null,
      apologyStatement: null,
      conflictDate: event.target.conflictDate.value,
      userId: props.userId
    });

    navigate(`/conflictList`);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleAddConflictFormSubmission}>
        <input
          type='text'
          name='title'
          placeholder='Give your confllict a simple title' />
        <label>when did this happen?
          <input 
            type="date" 
            name="conflictDate" />
        </label>
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
  onNewConflictCreation: PropTypes.func,
  userId: PropTypes.string
};

export default AddConflict;