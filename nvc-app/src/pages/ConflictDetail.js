import { useParams, useNavigate } from 'react-router-dom';
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
import { FormLabel, IconButton, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import CustomButton from '../components/CustomButton';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicIcon from '@mui/icons-material/Mic';

const ConflictDetail = (props) => {
  const { conflictId } = useParams();
  const navigate = useNavigate();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { title, conflictDate, description, feeling, need, needsStatement, apologyStatement, id } = thisConflict;

  function handleClickingEdit(thisId){
    navigate(`/edit/${thisId}`);
  }

  function handleEditNeedsClick(thisId){
    navigate(`/editNeedsStatement/${thisId}`);
  }

  function handleEditApologyClick(thisId){
    navigate(`/editApologyStatement/${thisId}`);
  }

  function handleCreateNeedsClick(thisId){
    navigate(`/editNeedsStatement/${thisId}`);
  }

  function handleCreateApologyClick(thisId){
    navigate(`/editApologyStatement/${thisId}`);
  }

  function handleClickingDelete(thisId){
    props.onClickingDelete(thisId);
    navigate('/conflictList');
  }

  const needsStatementDisplay = (
    <Box>
      <Grid item xs={12}> 
          <FormLabel>Needs Statement:</FormLabel>
          </Grid>
          <Grid item xs={12}> 
        <Typography variant='body2'>
          {needsStatement}
          <IconButton aria-label="edit" onClick={()=>{handleEditNeedsClick(id)}}>
            <EditIcon />
          </IconButton>
        </Typography>
      </Grid>
    </Box>
  )

  const apologyStatementDisplay = (
    <Box>
      <Grid item xs={12}> 
        <FormLabel>Apology Statement:</FormLabel>
      </Grid>
      <Grid item xs={12}> 
        <Typography variant='body2'>
        {apologyStatement}
        <IconButton aria-label="edit" onClick={()=>{handleEditApologyClick(id)}}>
          <EditIcon />
        </IconButton>
        
        </Typography>
      </Grid>
    </Box>
  )

  return (
    <React.Fragment>
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
                title= {title}
                subheader= {conflictDate}
                />
                <Box sx={{mb: 5, ml:5, mr:5}}>
                <Grid container spacing={1} columns={12}>


                  <Grid item xs={12}> 
                    <FormLabel>Description:</FormLabel>
                    </Grid>
                    <Grid item xs={12}> 
                  <Typography variant='h5'>
                      {description}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}> 
                    <FormLabel>How it made you feel:</FormLabel>
                    </Grid>
                    <Grid item xs={12}> 
                  <Typography variant='h5'>
                      {feeling}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}> 
                    <FormLabel>Your unmet need:</FormLabel>
                    </Grid>
                    <Grid item xs={12}> 
                  <Typography variant='h5'>
                      {need}
                    </Typography>
                  </Grid>

                </Grid>

                <Grid container spacing={0}  
                alignSelf='center'
                justify="center" sx={{ml:3, mt:3}}>
                  
                {needsStatement ? needsStatementDisplay : <Grid item xs={6}><CustomButton onClickFunction={()=>{handleCreateNeedsClick(id)}} buttonText="Create a needs request statement!"/></Grid>}
                
                {apologyStatement ? apologyStatementDisplay : <Grid item xs={6}><CustomButton onClickFunction={()=>{handleCreateApologyClick(id)}} buttonText="Write an apology!" /></Grid>}
              
              </Grid>
            </Box>
          </Card>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

ConflictDetail.propTypes = {
  conflictList: PropTypes.array,
  onClickingDelete: PropTypes.func
}

export default ConflictDetail;