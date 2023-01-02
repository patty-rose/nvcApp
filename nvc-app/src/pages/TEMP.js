import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const TEMP = props => {
  const {userId} = props;

  console.log(userId);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7070/api/conflicts?userId=${userId}`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then((jsonifiedResponse) => {
          setConflicts(jsonifiedResponse.results)
          setIsLoaded(true)
          console.log(jsonifiedResponse.results)
        })
      .catch((error) => {
        setError(error)
        setIsLoaded(true)
      });
    }, [userId])

  return (
    <Container>
      <Typography variant='h4'>conflicts: {conflicts}</Typography>
    </Container>
  )
}

TEMP.propTypes = {
  userId : PropTypes.string
}

export default TEMP