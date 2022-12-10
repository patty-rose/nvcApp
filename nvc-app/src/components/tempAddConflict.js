import React from 'react'

const AddDescription = () => {
  return (
    <div clasName='description-container'>
      <input
          type='text'
          name='title'
          placeholder='Give your confllict a simple title' />
        <label>when did this happen?
          <input 
            type="date" 
            name="conflictDate" />
        </label>
        <textarea
          name='description'
          placeholder='Describe what happened' />
    </div>
  )
}

export default AddDescription