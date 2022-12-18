import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';

const ConflictDetail = (props) => {
  const { conflictId } = useParams();
  const navigate = useNavigate();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { title, conflictDate, description, feelings, needs, needsStatement, apologyStatement, id } = thisConflict;
  console.log(id);

  function handleClickingEdit(thisId){
    navigate(`/edit/${thisId}`);
  }
  function handleClickingDelete(thisId){
    props.onClickingDelete(thisId);
    navigate('/conflictList');
  }

  return (
    <React.Fragment>
      <div>
      <Card elevation={0} sx={{ xs: 'flex', width: '85%',  ml: 15 }}>
        <CardHeader
          title= {`Conflict Details`}
        />
        <CardContent>
          <Card elevation={2} sx={{ xs: 'flex', width: '98%'}}>
            <CardHeader
            action={
              <Box>
                <IconButton aria-label="edit" onClick={()=>{handleClickingDelete(id)}}>
                <DeleteForeverIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={()=>{handleClickingEdit(id)}}>
                  <EditIcon />
                </IconButton>
              </Box>
            }
            />
            <Box sx={{mb: 5}}>
            <Grid container >
              <Grid item xs={4} > 
              <Typography variant='h6'  align="right" sx={{mr: 2}}>
                  Title:
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography variant='h5'>
                  {title}
                </Typography>
              </Grid>

              <Grid item xs={4}> 
              <Typography variant='h6'  align="right" sx={{mr: 2}}>
                  Description:
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography variant='h5'>
                  {description}
                </Typography>
              </Grid>

              <Grid item xs={4}> 
              <Typography variant='h6'  align="right" sx={{mr: 2}}>
                  How it made you feel:
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography variant='h5'>
                  {feelings}
                </Typography>
              </Grid>

              <Grid item xs={4}> 
              <Typography variant='h6'  align="right" sx={{mr: 2}}>
                  Unmet Need:
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography variant='h5'>
                  {needs}
                </Typography>
              </Grid>

              <Grid item xs={4}> 
              <Typography variant='h6'  align="right" sx={{mr: 2}}>
                  Needs statement:
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography variant='h5'>
                  {needsStatement}
                </Typography>
              </Grid>

              <Grid item xs={4}> 
              <Typography variant='h6'  align="right" sx={{mr: 2}}>
                  Apology Statment:
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography variant='h5'>
                  {apologyStatement}
                </Typography>
              </Grid>

            </Grid>
            </Box>
          </Card>
        </CardContent>
      </Card>
  
        
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