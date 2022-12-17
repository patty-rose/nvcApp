import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function ConflictCard(props) {
  const {title, conflictDate, description, feeling, need, needsStatement, apologyStatement, id} = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const cardActions = (
    <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
  );

  const displayNeedsStatement = (
    <Typography paragraph>Needs Statement: {needsStatement}</Typography>
  );

  const displayApologyStatement = (
    <Typography paragraph>Apology Statement: {apologyStatement}</Typography>
  );
  
  return (
    <React.Fragment>

      <Card elevation={2} sx={{ xs: 'flex', maxWidth: 500 , mt: 3 }}>
        <CardHeader
          action={
            <IconButton aria-label="edit">
              <Link to={`/edit/${id}`} className='btn'><EditIcon /></Link>
            </IconButton>
          }
          title={title}
          subheader={conflictDate}
        />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      {needsStatement || apologyStatement ? cardActions : null}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {needsStatement ? displayNeedsStatement : null}
        {apologyStatement ? displayApologyStatement : null}
        </CardContent>
      </Collapse>

    </Card>
    </React.Fragment>
  );
}

ConflictCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  feeling: PropTypes.string,
  need: PropTypes.string,
  needsStatement: PropTypes.string,
  apologyStatement: PropTypes.string,
  id: PropTypes.string,
  conflictDate: PropTypes.string
}

export default ConflictCard;