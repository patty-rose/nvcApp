import React, { useState } from 'react';
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


const AddConflictForm = (props) => {
  const [activePage, setActivePage] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    date: null,
    description: "",
    feelings: "",
    needs: ""
  });
  const navigate = useNavigate();

  const formTitles = ["conflict description", "how did you feel?", "what did you need"];

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
      feeling: formData.feelings, 
      need: formData.needs,
      needsStatement: null,
      apologyStatement: null,
      conflictDate: formData.date,
      userId: props.userId
    });
    navigate(`/${docRef.id}`);
  }

  return (
    <>
      <Box sx={{ width: '80%' }}>
        <Typography variant='h1'>Create Conflict</Typography>
        
        
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

        {activePageDisplay()}
        
      </Box>

        <div className='footer'>
        
          <Button
          sx={{ mr: 1 }}
          color="inherit"
          disabled = {activePage === 0}
          onClick={() => {setActivePage((currentActivePage) => currentActivePage - 1)}}
          >
            Prev
          </Button>

          <Button
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
        </div>
    </>
  );
};

AddConflictForm.propTypes = {
  onNewConflictCreation: PropTypes.func,
  userId: PropTypes.string
};

export default AddConflictForm;