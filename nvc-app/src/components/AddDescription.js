import React from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

const AddDescription = (props) => {

  const {formData, setFormData} = props;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartMicrophone = async () => {
    resetTranscript();
    await SpeechRecognition.startListening({
      continuous: true
    });
  }

  const handleStopMicrophone = () => {
    const newDescription = formData.description.concat(" " + transcript);
    setFormData({...formData, description: newDescription});
    SpeechRecognition.stopListening();
    resetTranscript();
  }

  const handleDescriptionInputChange = (e) => {
      if(listening){
        handleStopMicrophone();
      }
      setFormData({ ...formData, description: e.target.value 
      });
  }

  if (!browserSupportsSpeechRecognition) {//REFACTOR THIS ERROR HANDLING
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  return (
<>
    <Box sx={{mt: 5, mr:5, ml:5, mb: 5}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='title'
            defaultValue={formData.title}
            label="Give it a simple title:"
            name='title'
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="date"
          defaultValue={formData.date}
          label="Choose an aproximate date this happened:"
          type="date"
          onChange={(e) => {
            setFormData({ ...formData, date: e.target.value });
            console.log(e.target.value);
          }}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <div>
          <p>
            <button className='btn' onClick={() => {handleStartMicrophone()}}>
              Start
            </button>
            <button className='btn' onClick={() => {handleStopMicrophone()}}>Stop</button>
            Microphone: {listening ? 'on' : 'off'}
          </p>
        </div>   
        <Grid item xs={12}>
          <FormLabel>Let it out! Describe what happened with text or press the microphone button for text-to-speech!</FormLabel>
          <TextField
            fullWidth
            id='description'
            label=""
            name='description'
            multiline
            rows={5}
            value={ listening ? formData.description.concat(' ' + transcript) : formData.description }
            onChange={handleDescriptionInputChange}
          />
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

AddDescription.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AddDescription