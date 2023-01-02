import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const AddNeeds = (props) => {
  const { formData, setFormData } = props;
  return (
    <Box sx={{ mt: 5, mr: 5, ml: 5, mb: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="need"
            label="What unmet need do you have in this situation?"
            name="need"
            defaultValue={formData.need}
            onChange={(e) => {
              setFormData({ ...formData, need: e.target.value });
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

AddNeeds.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default AddNeeds;
