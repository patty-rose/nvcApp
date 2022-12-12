import React from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceToText = (props) => {
  const {formData, setFormData} = props;
  console.log(props);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleMicrophoneClick = async () => {
    await SpeechRecognition.startListening();
    console.log(transcript);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try{ 
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     navigate('/ConflictList');
  //   } catch (e) {
  //     setError(`There was an error signing up: ${e.message}`);
  //   } 
  // }


  // const GetSpeech = () => {
  //   console.log("clicked microphone");
  //   const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
  
  //   let recognition = new SpeechRecognition();

  //   recognition.onstart = () => {
  //       console.log("starting listening, speak in microphone");
  //   }
  //   recognition.onspeechend = () => {
  //       console.log("stopped listening");
  //       recognition.stop();
  //   }
  //   recognition.onresult = (result) => {
  //       console.log(result.results[0][0].transcript);
  //       const newDescription = formData.description.concat(result.results[0][0].transcript);
  //       setFormData({ ...formData, description: newDescription})
  //   }
    
  //   recognition.start();
  // }

  return (
    <div>
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button className='btn' onClick={SpeechRecognition.startListening}>Start</button>
        <button className='btn' onClick={SpeechRecognition.stopListening}>Stop</button>
        <p>{transcript}</p>
      </div>

      {/* <div>
        <button onClick={GetSpeech}><i className="button fa-solid fa-microphone">VOICE TO TEXT</i> </button>
      </div> */}
    </div>
  )
}

VoiceToText.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default VoiceToText