import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

function EditNeedsStatement (props) {
  const navigate = useNavigate();
  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { description, feeling, need, needsStatement, apologyStatement } = thisConflict;

  function createNeedsStatement(feeling, need){
    const needsStatement = `When you ____, I felt ${feeling}, I need ${need}.`
    return needsStatement;
  }

  const tempStatement = createNeedsStatement(feeling, need);

  function handleEditNeedsStatementSubmission(event) {
    event.preventDefault();
    props.onEditConflict({
      needsStatement: event.target.needsStatement.value,
      id: thisConflict.id
    });
    navigate('/conflictList');
  }

  return (
    <React.Fragment>
      <h1>create needs statement</h1>
      <h5>description: {description}</h5>
      <form onSubmit={handleEditNeedsStatementSubmission}>
        <label>
          needs statement:
          <textarea
            name='needsStatement'
            defaultValue={tempStatement} />
        </label>
        <button
        type='submit'>submit edits</button>
      </form>
    </React.Fragment>
  );
}

EditNeedsStatement.propTypes = {
  onEditConflict: PropTypes.func,
  conflictList: PropTypes.array
};

export default EditNeedsStatement;
