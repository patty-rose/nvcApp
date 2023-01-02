import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ApologyStatementForm from "../components/ApologyStatementForm";
import ApologyFinalEdit from "../components/ApologyFinalEdit.js";

function EditApologyStatement(props) {
  const [activePage, setActivePage] = useState(0);
  const [formData, setFormData] = useState({
    sorryFor: "",
    wrongBecause: "",
    nextTime: "",
    needsStatement: "",
  });

  const formTitles = ["4 step apology builder", "Finalize your apology"];

  const navigate = useNavigate();
  const { conflictId } = useParams();
  const thisConflict = props.conflictList.find(
    (conflict) => conflict.id === conflictId
  );

  const handleNextClick = () => {
    const tempStatement = `I am sorry for ${formData.sorryFor}. It was wrong because ${formData.wrongBecause}. Next time ${formData.nextTime}. Do you forgive me?`;
    setFormData({ ...formData, apologyStatement: tempStatement });
  };

  function handleEditApologyStatementSubmission() {
    props.onEditConflict({
      apologyStatement: formData.apologyStatment,
      id: thisConflict.id,
    });
    navigate("/conflictList");
  }

  const stepperDisplay = (
    <Stepper activeStep={activePage} alternativeLabel>
      {formTitles.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );

  const activePageDisplay = () => {
    if (activePage === 0) {
      return (
        <ApologyStatementForm formData={formData} setFormData={setFormData} />
      );
    } else {
      return <ApologyFinalEdit formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <Card elevation={0} sx={{ xs: "flex", width: "85%", ml: 15 }}>
      <CardHeader title={`Write an apology`} subheader={stepperDisplay} />
      <CardContent>
        <Card elevation={2} sx={{ xs: "flex", width: "98%" }}>
          <Box sx={{ mt: 5, mr: 5, ml: 5, mb: 5 }}>
            <Grid container spacing={2}>
              {activePageDisplay()}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    type="submit"
                    onClick={() => {
                      if (activePage === formTitles.length - 1) {
                        handleEditApologyStatementSubmission();
                      } else {
                        handleNextClick();
                        setActivePage((curractivePage) => curractivePage + 1);
                      }
                    }}
                  >
                    {activePage === formTitles.length - 1 ? "Submit" : "Next"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </CardContent>
    </Card>
  );
}

EditApologyStatement.propTypes = {
  onEditConflict: PropTypes.func,
  conflictList: PropTypes.array,
};

export default EditApologyStatement;
