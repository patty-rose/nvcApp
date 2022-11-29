import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

const NeedsStatement = (props) => {

  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { description, feeling, need, needsStatement, apologyStatement } = thisConflict;

  return (
    <section className='section'>
      <h2>Needs Statement</h2>
      <h4> "When you _____, I felt {feeling}, in the future I need {need}".</h4>
      

    </section>
  );
};

NeedsStatement.propTypes = {
  conflictList: PropTypes.array
};

export default NeedsStatement;