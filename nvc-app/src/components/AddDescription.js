import PropTypes from 'prop-types'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddDescription = (props) => {

  const {formData, setFormData} = props;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

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
        </div>
        <textarea
          className='form-textarea'
          name='description'
          placeholder='Describe what happened' 
          value={ listening ? formData.description.concat(' ' + transcript) : formData.description }
          // onChange={(e) => {
          //   setFormData({ ...formData, description: e.target.value 
          //   });
          // }}
          onChange={handleDescriptionInputChange}
          />
    </div>
  )
}

AddDescription.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AddDescription