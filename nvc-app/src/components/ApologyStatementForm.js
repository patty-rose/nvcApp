import PropTypes from "prop-types";
import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FormLabel } from "@mui/material";

function ApologyStatementForm(props) {
  const { formData, setFormData } = props;

  return (
    <React.Fragment>
      <FormLabel>1. I AM SORRY FOR.. </FormLabel>
      <Typography variant="body1" sx={{ fontSize: "10px" }}>
        Say you are sorry, and name the thing you are apologizing for. For
        example: “being late to our meeting.” Use objective language, just
        describe what happened. Avoid defending yourself and explaining why you
        did it.
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="sorryFor"
        label="What did you do that you feel bad about?"
        name="sorryFor"
        onChange={(e) => {
          setFormData({ ...formData, sorryFor: e.target.value });
        }}
      />
      <FormLabel>2. IT WAS WRONG BECAUSE..</FormLabel>
      <Typography variant="body1" sx={{ fontSize: "10px" }}>
        This step is optional, but can be meaningful to the person receiving the
        apology. Use empathy to consider what unmet need they may have had when
        this happened. For example: "I was not considering your time and
        feelings."
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="wrongBecause"
        label="Why do you think you shouldn't have done this?"
        name="wrongBecause"
        // defaultValue={formData.title}
        onChange={(e) => {
          setFormData({ ...formData, wrongBecause: e.target.value });
        }}
      />
      <FormLabel>3. NEXT TIME..</FormLabel>
      <Typography variant="body1" sx={{ fontSize: "10px" }}>
        An apology is just the beginning of making things right. Say what you
        intend to do differently going forward. “Next time, if I am running late
        I will send you a text message as soon as I can.”
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="nextTime"
        label="How will you do this better in the future?"
        name="nextTime"
        // defaultValue={formData.title}
        onChange={(e) => {
          setFormData({ ...formData, nextTime: e.target.value });
        }}
      />
      <FormLabel>4. DO YOU FORGIVE ME?</FormLabel>
      <Typography variant="body1" sx={{ fontSize: "10px" }}>
        They may not forgive you. How would it make you feel if they were not
        able to accept your apology?
      </Typography>
    </React.Fragment>
  );
}

ApologyStatementForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default ApologyStatementForm;
