import React from 'react'
import PropTypes from 'prop-types'

const AddDescription = (props) => {
  const {formData, setFormData} = props;
  return (
    <div clasName='description-container'>
      <input
          type='text'
          name='title'
          placeholder='Give your confllict a simple title' 
          defaultValue={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
          />
        <label>when did this happen?
          <input 
            type="date" 
            name="conflictDate"
            defaultValue={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
            }}
            />
        </label>
        <textarea
          name='description'
          placeholder='Describe what happened' 
          defaultValue={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          />
    </div>
  )
}

AddDescription.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AddDescription