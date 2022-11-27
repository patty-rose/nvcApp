import { Link } from 'react-router-dom';
import React from "react";
import PropTypes from "prop-types"; 
import ReusableForm from "../components/ReusableForm";

const AddConflict = (props) => {

  function handleAddConflictFormSubmission(event) {
    event.preventDefault();
    props.onNewConflictCreation({
      description: event.target.description.value, 
      feeling: event.target.feeling.value, 
      need: event.target.need.value, 
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleAddConflictFormSubmission}
        buttonText="Submit" />
    </React.Fragment>
  );
}

AddConflict.propTypes = {
  onNewConflictCreation: PropTypes.func
};

export default AddConflict;