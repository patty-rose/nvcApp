import React from "react";
import Conflict from "../components/Conflict";
import PropTypes from "prop-types";

const ConflictList = (props) => {
  
  return (
    <React.Fragment>
      <hr/>
      {props.conflictList.map((conflict) =>
        <Conflict 
          description={conflict.description}
          feeling={conflict.feeling}
          need={conflict.need}
          needsStatement={conflict.needsStatement}
          apologyStatement={conflict.apologyStatement}
          id={conflict.id}
          key={conflict.id}/>
      )}
    </React.Fragment>
  );
};

ConflictList.propTypes = {
  conflictList: PropTypes.array
}
export default ConflictList;