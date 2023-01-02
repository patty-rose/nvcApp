import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";

function EditConflict(props) {
  const navigate = useNavigate();
  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find(
    (conflict) => conflict.id === conflictId
  );
  const [formData, setFormData] = useState({
    title: thisConflict.title,
    conflictDate: thisConflict.conflictDate,
    description: thisConflict.description,
    feelings: thisConflict.feelings,
    needs: thisConflict.needs,
    needsStatement: thisConflict.needsStatement,
    apologyStatement: thisConflict.apologyStatement,
  });

  const needsStatementInputField = (
    <TextField
      margin="normal"
      fullWidth
      id="needsStatement"
      label="Needs Statement:"
      name="needsStatement"
      defaultValue={formData.needsStatement}
      onChange={(e) => {
        setFormData({ ...formData, needsStatement: e.target.value });
      }}
    />
  );

  const apologyStatementInputField = (
    <TextField
      margin="normal"
      fullWidth
      id="apologyStatement"
      label="Apology Statement:"
      name="apologyStatement"
      defaultValue={formData.apologyStatement}
      onChange={(e) => {
        setFormData({ ...formData, apologyStatement: e.target.value });
      }}
    />
  );

  function handleEditConflictSubmission(event) {
    event.preventDefault();
    props.onEditConflict({
      title: formData.title,
      conflictDate: formData.conflictDate,
      description: formData.description,
      feelings: formData.feelings,
      needs: formData.needs,
      needsStatement: formData.needsStatement,
      apologyStatement: formData.apologyStatement,
      id: thisConflict.id,
      userId: thisConflict.userId,
    });
    navigate("/conflictList");
  }

  return (
    <React.Fragment>
      <Card elevation={0} sx={{ xs: "flex", width: "85%", ml: 15 }}>
        <CardHeader
          title={`Edit Conflict`}
        />
        <CardContent>
          <Card elevation={2} sx={{ xs: "flex", width: "98%" }}>
            <Box
              component="form"
              onSubmit={handleEditConflictSubmission}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box sx={{ mt: 5, mr: 5, ml: 5, mb: 5 }}>
                <Grid container spacing={2}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="title"
                    label="Title:"
                    name="title"
                    defaultValue={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                    }}
                  />
                  <TextField
                    id="conflictDate"
                    defaultValue={formData.conflictDate}
                    label="Approximate Date:"
                    type="date"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        conflictDate: e.target.value,
                      });
                    }}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description:"
                    name="description"
                    defaultValue={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="feelings"
                    label="Feeling:"
                    name="feelings"
                    defaultValue={formData.feelings}
                    onChange={(e) => {
                      setFormData({ ...formData, feelings: e.target.value });
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="needs"
                    label="Unmet Need:"
                    name="needs"
                    defaultValue={formData.needs}
                    onChange={(e) => {
                      setFormData({ ...formData, needs: e.target.value });
                    }}
                  />
                  {formData.apologyStatement
                    ? apologyStatementInputField
                    : null}
                  {formData.needsStatement ? needsStatementInputField : null}
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Button type="submit">submit edits</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

EditConflict.propTypes = {
  onEditconflict: PropTypes.func,
  conflict: PropTypes.object,
};

export default EditConflict;
