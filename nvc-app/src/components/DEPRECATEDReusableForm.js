import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {

  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
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
        className='btn' type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;