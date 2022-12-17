import React from "react";
import Conflict from "../components/TempConflictCard";
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';

const ConflictList = (props) => {
  
  return (
    <React.Fragment>
       <Grid
        container
        spacing={0}
        direction="column"
        alignSelf='center'
        justify="center"
        sx={{ ml: 20, minHeight: '100vh' }}
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
      
    </React.Fragment>
  );
};

ConflictList.propTypes = {
  conflictList: PropTypes.array
}
export default ConflictList;