import React from 'react';
import PropTypes from 'prop-types';

const AddNeeds = (props) => {
  const {formData, setFormData} = props;
  return (
    <div className='needs-container'>
      <textarea
          name='need'
          placeholder='What do you need in the future?'
          defaultValue={formData.needs}
          onChange={(e) => {
            setFormData({ ...formData, needs: e.target.value });
          }}
      />
    </div>
  )
}

AddNeeds.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AddNeeds