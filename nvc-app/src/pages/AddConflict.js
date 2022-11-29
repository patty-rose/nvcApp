import { Link, useNavigate } from 'react-router-dom';
import React from "react";
import PropTypes from "prop-types"; 
import ReusableForm from "../components/ReusableForm";

function AddConflict(props) {

  const navigate = useNavigate();

  function createNeedsStatement(feeling, need){
    const needsStatement = `When you ____, I felt ${feeling}, I need ${need}.`
    return needsStatement;
  }

  function handleAddConflictFormSubmission(event) {
    event.preventDefault();
    const need = event.target.need.value;
    const feeling = event.target.feeling.value;
    const needsStatement = createNeedsStatement(feeling, need);
    props.onNewConflictCreation({
      description: event.target.description.value, 
      feeling: feeling, 
      need: need,
      needsStatement: needsStatement,
      apologyStatemnet: null
    });

    navigate('/conflictList');
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
        type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

AddConflict.propTypes = {
  onNewConflictCreation: PropTypes.func
};

export default AddConflict;