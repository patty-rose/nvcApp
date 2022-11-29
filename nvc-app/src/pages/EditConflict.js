import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

function EditConflict (props) {
  const navigate = useNavigate();
  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { description, feeling, need, needsStatement, apologyStatement } = thisConflict;

  function handleEditConflictSubmission(event) {
    event.preventDefault();
    props.onEditConflict({
      description: event.target.description.value, 
      feeling: event.target.feeling.value, 
      need: event.target.need.value,
      needsStatement: event.target.needsStatement.value,
      apologyStatement: event.target.apologyStatement.value,
      id: thisConflict.id
    });
    navigate('/conflictList');
  }

  return (
    <React.Fragment>
      <form onSubmit={handleEditConflictSubmission}>
        <label>
          describe what happened:
          <textarea
            name='description'
            defaultValue={description}
            // onChange={(e)=>{{description}= e.target.value}} 
            />
        </label>
        <label>
          How did that make you feel?
          <input
            type='text'
            defaultValue={feeling}
            name='feeling'
          />
        </label>
        <label>
          What do you need in the future?
          <textarea
            name='need'
            defaultValue={need} />
        </label>
        <label>
          Needs request statement:
          <textarea
            name='needsStatement'
            defaultValue={needsStatement} />
        </label>
        <label>
          Apology Statement:
          <textarea
            name='apologyStatement'
            defaultValue={apologyStatement} />
        </label>
        <button
        type='submit'>submit edits</button>
      </form>
    </React.Fragment>
  );
}

EditConflict.propTypes = {
  onEditconflict: PropTypes.func,
  conflict: PropTypes.object
};

export default EditConflict;
