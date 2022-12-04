import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

const NeedsStatement = (props) => {

  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { description, feeling, need, needsStatement, apologyStatement, userId } = thisConflict;

  function createNeedsStatement(feeling, need){
    const needsStatement = `When you ____, I felt ${feeling}, I need ${need}.`
    return needsStatement;
  }

  return (
    <section className='section'>
      <h2>Create a Needs Statement</h2>
      <p>Conflict description: ${description}</p>
      <h4>needs statement:</h4>
      <p> "When you _____, I felt {feeling}, in the future I need {need}".</p>
      <Link to={`/conflictList`} className='btn'>accept</Link>

    </section>
  );
};

NeedsStatement.propTypes = {
  conflictList: PropTypes.array
};

export default NeedsStatement;