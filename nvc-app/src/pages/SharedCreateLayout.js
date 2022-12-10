import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AddConflict from '../components/AddConflict';
import AddFeelings from '../components/AddFeelings';
import AddNeeds from '../components/AddNeeds';
import AddDescription from '../components/tempAddConflict';


const SharedCreateLayout = () => {

  const [page, setPage] = useState(0);
  const formTitles = ["conflict description", "how did you feel?", "what did you need"];

  const pageDisplay = () => {
    if (page === 0){
      return <AddDescription />
    } else if (page === 1){
      return <AddFeelings />;
    } else {
      return <AddNeeds />;
    }
  }

  return (
    <>
      <div className="multi-page-form">
        <h1>Add Event</h1>
        <div className="progressbar">
          <div
          style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
          >progress bar</div>
      </div>
        <div className="header">
          <h1>{formTitles[page]}</h1>
        </div>
        <div className='body'>{pageDisplay()}</div>
        <div className='footer'>
          <button
          disabled = {page == 0}
          onClick={() => {setPage((currPage) => currPage - 1)}}
          >
            Prev
          </button>
          <button 
            disabled = {page == formTitles.length - 1}
            onClick={() => {setPage((currPage) => currPage + 1)}}
            >
              Next
          </button>
        </div>
      </div>
    </>
  );
};
export default SharedCreateLayout;