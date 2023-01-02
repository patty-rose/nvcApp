import PropTypes from "prop-types";
import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormLabel } from '@mui/material';

function NeedsStatementForm (props) {
  const {formData, setFormData} = props;

  return (
    <React.Fragment>
      <FormLabel>1. WHEN YOU..</FormLabel>
      <Typography variant='body1' sx={{fontSize: '10px'}}>Using objective language, describe succinctly what happened that bothered you. For example: "When you are late for our meetings.." Stick to the facts; avoid terms like "always" and "never" and judgements.</Typography>
        <TextField
          margin="normal"
          fullWidth
          id="whenYou"
          label="What happened?"
          name="whenYou"
          // defaultValue={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, whenYou: e.target.value });
          }}
        />
        <FormLabel>2. I FEEL..</FormLabel>
        <Typography variant='body1' sx={{fontSize: '10px'}}>How did it make you feel when that action happened or happens? For example: "I felt inconsidered" "I feel angry"</Typography>
        <TextField
          margin="normal"
          fullWidth
          id="iFeel"
          label="How did you feel?"
          name="iFeel"
          // defaultValue={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, iFeel: e.target.value });
          }}
        />
        <FormLabel>3. I NEED..</FormLabel>
        <Typography variant='body1' sx={{fontSize: '10px'}}>What unmet need do you have in this conflict? For example: "I need you to text me if you are going to be late in the future"</Typography>
        <TextField
          margin="normal"
          fullWidth
          id="iNeed"
          label="What is your unmet need?"
          name="iNeed"
          // defaultValue={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, iNeed: e.target.value });
          }}
        />
        <FormLabel>4. CAN YOU AGREE TO THAT?</FormLabel>
        <Typography variant='body1' sx={{fontSize: '10px'}}>The last part of using Non-Violent Communication when you're in conflict is to check if the other person is willing to meet your needs. They may say no, and that is their choice. What does it mean to you if they are not willing to meet your needs?</Typography>      
    </React.Fragment>
  );
}

NeedsStatementForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

export default NeedsStatementForm;
