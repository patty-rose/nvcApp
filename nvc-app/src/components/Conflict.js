import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function Conflict(props){

  return (
    <React.Fragment>
      <div>
        <h5>{props.title} | {props.conflictDate}</h5>
        <p>what happened: {props.description}</p>
        <p>how you felt: {props.feeling}</p>
        <p>what you need: {props.need}</p>
        <p>needs statement: {props.needsStatement}</p>
        <p>apology statement: {props.apologyStatement}</p>
        <Link to={`/${props.id}`} className='btn'>
        details</Link>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Conflict.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  feeling: PropTypes.string,
  need: PropTypes.string,
  needsStatement: PropTypes.string,
  apologyStatement: PropTypes.string,
  id: PropTypes.string,
  conflictDate: PropTypes.string
}

export default Conflict;