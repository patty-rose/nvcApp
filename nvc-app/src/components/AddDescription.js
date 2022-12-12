import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import VoiceToText from './VoiceToText';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddDescription = (props) => {
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
    const newDescription = formData.description.concat(" " + finalTranscript);
    setFormData({...formData, description: newDescription});
  }, [finalTranscript]);
  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleMicrophoneClick = async () => {
    await SpeechRecognition.startListening({
      continuous: true
    });
    resetTranscript();
  }

  return (
    <div className='description-container'>
      <input
          className='form-input'
          type='text'
          name='title'
          placeholder='Give your confllict a simple title' 
          defaultValue={formData.title}
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
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button className='btn' onClick={() => {handleMicrophoneClick()}}>
            Start
          </button>
          <button className='btn' onClick={SpeechRecognition.stopListening}>Stop</button>
          <p>listening: {listening ? "listening" : "not listening" }</p>
          <p>transcript: {transcript}</p>
          <p>interim: {interimTranscript}</p>
          <p>final: {finalTranscript}</p>
        </div>
        <textarea
          className='form-textarea'
          name='description'
          placeholder='Describe what happened' 
          defaultValue={ listening ? formData.description.concat(transcript) : formData.description }
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
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

// while (listening){
//   defaultValue={formData.description.concat(transcript)}
// }