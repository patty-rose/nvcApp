import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

function EditApologyStatement (props) {
  const navigate = useNavigate();
  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { title, description, feeling, need, needsStatement, apologyStatement, conflictDate } = thisConflict;

  function handleEditApologyStatementSubmission(event) {
    event.preventDefault();
    props.onEditConflict({
      apologyStatement: event.target.apologyStatement.value,
      id: thisConflict.id
    });
    navigate('/conflictList');
  }

  return (
    <React.Fragment>
      <h1>create apology statement</h1>
      <h5>description: {description}</h5>
      <p> apology steps:</p>
      <ul>
        <li>1. Say you’re sorry, and name the thing you are apologizing for. In this example, it would go like “sorry I hit you with my book”. </li>
        <li>2. Say why it was wrong. “It was wrong to choose to throw the book, and it was wrong to hurt you.”</li>
        <li>3. Say what you will do differently next time. “Next time, when I’m frustrated, I will talk to you about it instead of throwing something at you.”</li>
        <li>4. Ask for forgiveness. “Do you forgive me?”</li>
      </ul>
      <form onSubmit={handleEditApologyStatementSubmission}>
        <label>
          apology statement:
          <textarea
            name='apologyStatement'
            // defaultValue={tempStatement} 
            />
        </label>
        <button
        type='submit'>submit edits</button>
      </form>
    </React.Fragment>
  );
}

EditApologyStatement.propTypes = {
  onEditConflict: PropTypes.func,
  conflictList: PropTypes.array
};

export default EditApologyStatement;
