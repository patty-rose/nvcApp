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
import NeedsStatementForm from "../components/NeedsStatementForm";
import NeedsStatementFinalEdit from "../components/NeedsStatementFinalEdit";

function EditNeedsStatement(props) {
  const [activePage, setActivePage] = useState(0);
  const [formData, setFormData] = useState({
    whenYou: "",
    iFeel: "",
    iNeed: "",
    needsStatement: "",
  });

  const formTitles = [
    "4 step needs request statement builder",
    "Finalize your needs request statement",
  ];
  const navigate = useNavigate();
  const { conflictId } = useParams();
  const thisConflict = props.conflictList.find(
    (conflict) => conflict.id === conflictId
  );

  const handleNextClick = () => {
    const tempStatement = `When you ${formData.whenYou} I feel ${formData.iFeel}. I need ${formData.iNeed}. Can you agree to that?`;
    setFormData({ ...formData, needsStatement: tempStatement });
  };

  function handleEditNeedsStatementSubmission() {
    props.onEditConflict({
      needsStatement: formData.needsStatement,
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
        <NeedsStatementForm formData={formData} setFormData={setFormData} />
      );
    } else {
      return (
        <NeedsStatementFinalEdit
          formData={formData}
          setFormData={setFormData}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <Card elevation={0} sx={{ xs: "flex", width: "85%", ml: 15 }}>
        <CardHeader
          title={`Create a Needs Statement`}
          subheader={stepperDisplay}
        />
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
                          handleEditNeedsStatementSubmission();
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
    </React.Fragment>
  );
}

EditNeedsStatement.propTypes = {
  onEditConflict: PropTypes.func,
  conflictList: PropTypes.array,
};

export default EditNeedsStatement;