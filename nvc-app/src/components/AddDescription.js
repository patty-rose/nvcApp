import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import VoiceToText from './VoiceToText';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddDescription = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [text, setText] = useState('');


  const {formData, setFormData} = props;

  const {
    transcript,
    finalTranscript,
    listening,
    interimTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setText(transcript);
  }, [transcript]);
  

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

  const handleThisClick = () => {
    const manager = SpeechRecognition.getRecognitionManager();
    // manager.updateTranscript({results : "hi", resultIndex : 0})
    console.log(manager);
  }

  return (
    <div className='description-container'>
      <input
          className='form-input'
          type='text'
          name='title'
          placeholder='Give your confllict a simple title' 
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
          />
        <label>when did this happen?
          <input 
            className='form-input'
            type="date" 
            name="conflictDate"
            defaultValue={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
            }}
            />
        </label>
        <div>
          <p>
            <button className='btn' onClick={() => {handleStartMicrophone()}}>
              Start
            </button>
            <button className='btn' onClick={() => {handleStopMicrophone()}}>Stop</button>
            Microphone: {listening ? 'on' : 'off'}
          </p>
          <p>TRANSCRIPT: {transcript}</p>
          <p>FINALTRANSCRIPT:{finalTranscript}</p>
          <p>TEXT: {text}</p>
        </div>
        {/* BUG: onChange triggers defaultValue to stop updating when listening is true */}
        <button className='btn' onClick={() => {handleThisClick()}}>
              manager
            </button>
        <textarea
          className='form-textarea'
          name='description'
          placeholder='Describe what happened' 
          value={ listening ? formData.description.concat(text) : formData.description }
          // defaultValue = {inputValue}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value 
            });
            //update text field with current transcript TEXT
            //set the form data to the text field
            //reset transcript
            //start listening
          }}
          />
    </div>
  )
}

AddDescription.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AddDescription