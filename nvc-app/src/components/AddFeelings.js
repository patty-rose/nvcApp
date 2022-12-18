import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const AddFeelings = (props) => {
  const {formData, setFormData} = props;
  return (
    <Box sx={{mt: 5, mr:5, ml:5, mb: 5}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='feeling'
            defaultValue={formData.feelings}
            label="How did this make you feel?"
            name='feeling'
            defaultValue={formData.feelings}
            onChange={(e) => {
              setFormData({ ...formData, feelings: e.target.value });
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

AddFeelings.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AddFeelings