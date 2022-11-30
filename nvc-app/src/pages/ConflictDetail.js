import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

const ConflictDetail = (props) => {
  const { conflictId } = useParams();
  const navigate = useNavigate();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { title, description, feeling, need, needsStatement, apologyStatement, id, conflictDate } = thisConflict;

  function handleClickingDelete(id){
    navigate('/conflictList');
    props.onClickingDelete(id);
  }
  return (
    <React.Fragment>
      <div>
        <h3>{title}</h3>
        <p>what happened: {description}</p>
        <p>{conflictDate}</p>
        <p>how you felt: {feeling}</p>
        <p>what you need: {need}</p>
        <p>{needsStatement}</p>
        <p>{apologyStatement}</p>
        {/* <Link to={`/${props.id}`} className='btn'>
        details</Link> */}
        <Link to={`/edit/${id}`} className='btn'>
        edit</Link>
        <Link to={`/editNeedsStatement/${id}`} className='btn'>
        create needs statement</Link>
        <Link to={`/editApologyStatement/${id}`} className='btn'>
        create apology statement</Link>
        <button className='btn'
        onClick={()=> handleClickingDelete(id)}>Delete</button>
        <hr/>
      </div>
    </React.Fragment>
  );
};

ConflictDetail.propTypes = {
  conflictList: PropTypes.array,
  onClickingDelete: PropTypes.func
}

export default ConflictDetail;