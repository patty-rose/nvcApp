import React from "react";
import PropTypes from "prop-types";

function Conflict(props){

  return (
    <React.Fragment>
      <div>
        <p>what happened: {props.description}</p>
        <p>how you felt: {props.feeling}</p>
        <p>what you need: {props.need}</p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Conflict.propTypes = {
  description: PropTypes.string,
  feeling: PropTypes.string,
  need: PropTypes.string,
  id: PropTypes.string
}

export default Conflict;