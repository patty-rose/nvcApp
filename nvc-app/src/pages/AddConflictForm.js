import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import AddConflict from '../components/AddConflict';
import AddFeelings from '../components/AddFeelings';
import AddNeeds from '../components/AddNeeds';
import AddDescription from '../components/AddDescription';
import PropTypes from 'prop-types';
import Stepper from '@mui/material/Stepper';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import feelingsImage from '../img/feelings.png';
import statesImage from '../img/states.png';

const AddConflictForm = (props) => {
  const [activePage, setActivePage] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    date: null,
    description: "",
    feeling: "",
    need: ""
  });
  const navigate = useNavigate();

  const formTitles = ["Let it out!", "How did this conflict make you FEEL?", "What unmet NEED do you have?"];

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
  )
  
  const activePageDisplay =()  => {
    if (activePage === 0){
      return <AddDescription formData = {formData} setFormData = {setFormData}/>
    } else if (activePage === 1){
      return <AddFeelings formData = {formData} setFormData = {setFormData}/>;
    } else {
      return <AddNeeds formData = {formData} setFormData = {setFormData}/>;
    }
  }

  const handleAddConflictSubmission = async () => {
    const docRef = await props.onNewConflictCreation({
      title: formData.title,
      description: formData.description, 
      feeling: formData.feeling, 
      need: formData.need,
      needsStatement: null,
      apologyStatement: null,
      conflictDate: formData.date,
      userId: props.userId
    });
    navigate(`/${docRef.id}`);
  }

  return (
    <>
    <Card elevation={0} sx={{ xs: 'flex', width: '80%',  ml: 15 }}>
        <CardHeader
          title="Log New Conflict Event"
          subheader= {stepperDisplay}
        />

      <CardContent>
      <Box>
      <Card elevation={2} sx={{ xs: 'flex', width: '98%'}}>
        <CardContent>
          {activePageDisplay()}
        </CardContent>
      </Card>

        <Box sx={{ mb: 5, display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
          sx={{ mr: 1 }}
          color="inherit"
          disabled = {activePage === 0}
          onClick={() => {setActivePage((currentActivePage) => currentActivePage - 1)}}
          >
            Prev
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            sx={{ mr: 1 }}
            onClick={() => {
              if (activePage === formTitles.length - 1) {
                handleAddConflictSubmission();
              } else {
                setActivePage((curractivePage) => curractivePage + 1);
              }
            }}
          >
            {activePage === formTitles.length - 1 ? "Submit" : "Next"}
        </Button>
        </Box>
      </Box>
      {activePage === 1 ? <Box><Box
            component="img"
            sx={{
              height: 'auto',
              width: '100%',
            }}
            alt="list of feelings"
            src={feelingsImage}
          /> <Box
          component="img"
          sx={{
            height: 'auto',
            width: '100%',
          }}
          alt="informaiton on emotional states"
          src={statesImage}
        /> </Box> : null}

      </CardContent>
    </Card>
      
    </>
  );
};

AddConflictForm.propTypes = {
  onNewConflictCreation: PropTypes.func,
  userId: PropTypes.string
};

export default AddConflictForm;