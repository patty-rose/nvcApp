import React from 'react';
import PropTypes from 'prop-types';

const AddFeelings = (props) => {
  const {formData, setFormData} = props;
  return (
    <div className='feelings-container'>
      <input
          type='text'
          name='feeling'
          placeholder='How did that make you feel?'
          defaultValue={formData.feelings}
          onChange={(e) => {
            setFormData({ ...formData, feelings: e.target.value });
          }}
      />
    </div>
  )
}

AddFeelings.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AddFeelings