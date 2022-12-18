import React from "react";
import {Link} from 'react-router-dom';
import Conflict from "../components/ConflictCard";
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ConflictList = (props) => {
  
  return (
    <React.Fragment>
      <Card elevation={0} sx={{ xs: 'flex', maxWidth: 550,  ml: 20,   }}>
        <CardHeader
          action={
            <IconButton aria-label="add">
              <Link style ={{textDecoration: 'none', color: '#4F5361'}}  to='/addEvent' className='btn'><AddCircleIcon /></Link>
            </IconButton>
          }
          title= 'Your conflicts:'
          subheader='add, view, and edit your conflicts'
        />

      <CardContent>
        <Grid
          container
          spacing={0}
          direction="column"
          alignSelf='center'
          justify="center"
          sx={{ minHeight: '100vh' }}
        >   
          {props.conflictList.map((conflict) =>
            <Conflict 
              title={conflict.title}
              conflictDate={conflict.conflictDate}
              description={conflict.description}
              feeling={conflict.feeling}
              need={conflict.need}
              needsStatement={conflict.needsStatement}
              apologyStatement={conflict.apologyStatement}
              id={conflict.id}
              key={conflict.id}/>
          )} 
        </Grid>
      </CardContent>
    </Card>
    </React.Fragment>
  );
};

ConflictList.propTypes = {
  conflictList: PropTypes.array
}
export default ConflictList;