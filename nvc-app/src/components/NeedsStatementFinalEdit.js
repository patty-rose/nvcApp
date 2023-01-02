import PropTypes from "prop-types";
import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function NeedsStatementFinalEdit (props) {
  const {formData, setFormData} = props;

  return (
    <React.Fragment>
      <TextField
        margin="normal"
        fullWidth
        id="needsStatement"
        name="needsStatment"
        multiline
        rows={5}
        defaultValue={formData.needsStatement}
        onChange={(e) => {
          setFormData({ ...formData, needsStatement: e.target.value });
        }}
      />
      <Typography variant='body1' sx={{fontSize: '10px'}}>Here is your statement to edit and consider. You can edit it right here. You can memorize it to use in conversation with whomever you are in conflict with. You can read it out loud to them if you need to. You can send it in a text-message or email or letter. You can keep it to yourself, sometimes it is nice just to consider it.</Typography>
    </React.Fragment>
  );
}

NeedsStatementFinalEdit.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

export default NeedsStatementFinalEdit;
