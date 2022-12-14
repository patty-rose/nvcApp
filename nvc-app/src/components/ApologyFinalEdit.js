import PropTypes from "prop-types";
import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function ApologyStatementFinalEdit(props) {
  const { formData, setFormData } = props;

  return (
    <React.Fragment>
      <TextField
        margin="normal"
        fullWidth
        id="apologyStatement"
        name="apologyStatment"
        multiline
        rows={5}
        defaultValue={formData.apologyStatement}
        onChange={(e) => {
          setFormData({ ...formData, apologyStatement: e.target.value });
        }}
      />
      <Typography variant="body1" sx={{ fontSize: "10px" }}>
        Here is your apology to edit and consider. You can edit it right here.
        You can memorize it to use in conversation with whomever you are in
        conflict with. You can read it out loud to them if you need to. You can
        send it in a text-message or email or letter. You can keep it to
        yourself, sometimes it is nice just to consider it.
      </Typography>
    </React.Fragment>
  );
}

ApologyStatementFinalEdit.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default ApologyStatementFinalEdit;
