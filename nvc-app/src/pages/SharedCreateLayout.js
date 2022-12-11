import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AddConflict from '../components/AddConflict';
import AddFeelings from '../components/AddFeelings';
import AddNeeds from '../components/AddNeeds';
import AddDescription from '../components/tempAddConflict';
import PropTypes from 'prop-types';


const SharedCreateLayout = (props) => {
  const {onNewConflictCreation, userId} = props;
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    date: null,
    description: "",
    feelings: "",
    needs: ""
  });
  const navigate = useNavigate();

  const formTitles = ["conflict description", "how did you feel?", "what did you need"];

  const pageDisplay = () => {
    if (page === 0){
      return <AddDescription formData = {formData} setFormData = {setFormData}/>
    } else if (page === 1){
      return <AddFeelings formData = {formData} setFormData = {setFormData}/>;
    } else {
      return <AddNeeds formData = {formData} setFormData = {setFormData}/>;
    }
  }

  function handleAddConflictSubmission() {
    props.onNewConflictCreation({
      title: formData.title,
      description: formData.description, 
      feeling: formData.feelings, 
      need: formData.needs,
      needsStatement: null,
      apologyStatement: null,
      conflictDate: formData.date,
      userId: props.userId
    });

    navigate(`/conflictList`);
  }
  return (
    <>
      <div className="multi-page-form">
        <h1>Add Event</h1>
        <div className="progressbar">
          <div
          style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
          >progress bar</div>
      </div>
        <div className="header">
          <h1>{formTitles[page]}</h1>
        </div>
        <div className='body'>{pageDisplay()}</div>
        <div className='footer'>
          <button
          disabled = {page === 0}
          onClick={() => {setPage((currPage) => currPage - 1)}}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === formTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
                handleAddConflictSubmission();
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === formTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

SharedCreateLayout.propTypes = {
  onNewConflictCreation: PropTypes.func,
  userId: PropTypes.string
};

export default SharedCreateLayout;