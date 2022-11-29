import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

function EditApologyStatement (props) {
  const navigate = useNavigate();
  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { description, feeling, need, needsStatement, apologyStatement } = thisConflict;

  function createApologyStatement(feeling, need){
    const apologyStatement = `When you ____, I felt ${feeling}, I need ${need}.`
    return apologyStatement;
  }

  const tempStatement = createApologyStatement(feeling, need);

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
      <form onSubmit={handleEditapologyStatementSubmission}>
        <label>
          apology statement:
          <textarea
            name='apologyStatement'
            defaultValue={tempStatement} />
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

export default EditapologyStatement;
