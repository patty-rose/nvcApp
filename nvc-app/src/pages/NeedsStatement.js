import { Link, useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";

const NeedsStatement = (props) => {

  const { conflictId } = useParams();

  const thisConflict = props.conflictList.find((conflict) => conflict.id === conflictId);

  const { description, feeling, need } = thisConflict;

  function createNeedsStatement(feeling, need){
    const needsStatement = `When you ____, I felt ${feeling}, I need ${need}.`
    return needsStatement;
  }

  return (

    <section className='section'>
      <Card elevation={0} sx={{ xs: 'flex', width: '85%',  ml: 15 }}>
        <CardHeader
          title= {`Edit Needs Statement`}
          subheader= {title}
        />
        <CardContent>
          <Card elevation={2} sx={{ xs: 'flex', width: '98%'}}>
            <Box component="form" onSubmit={handleEditNeedsStatementSubmission} noValidate sx={{ mt: 1 }}>
              <Box sx={{mt: 5, mr:5, ml:5, mb: 5}}>
                <Grid container spacing={2}>
                <FormLabel>1. WHEN YOU..</FormLabel>
                <Typography variant='body1' sx={{fontSize: '10px'}}>Using objective language, describe succinctly what happened that bothered you. For example: "When you are late for our meetings.." Stick to the facts; avoid terms like "always" and "never" and judgements.</Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="describing"
                    label="What happened?"
                    name="describing"
                    // defaultValue={formData.title}
                    // onChange={(e) => {
                    //   setFormData({ ...formData, title: e.target.value });
                    // }}
                  />
                  <FormLabel>2. I FEEL..</FormLabel>
                  <Typography variant='body1' sx={{fontSize: '10px'}}>How did it make you feel when that action happened or happens? For example: "I felt inconsidered" "I feel angry"</Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="feeling"
                    label="How did you feel?"
                    name="feeling"
                    // defaultValue={formData.title}
                    // onChange={(e) => {
                    //   setFormData({ ...formData, title: e.target.value });
                    // }}
                  />
                  <FormLabel>3. I NEED..</FormLabel>
                  <Typography variant='body1' sx={{fontSize: '10px'}}>What unmet need do you have in this conflict? For example: "I need you to text me if you are going to be late in the future"</Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="feeling"
                    label="How did you feel?"
                    name="feeling"
                    // defaultValue={formData.title}
                    // onChange={(e) => {
                    //   setFormData({ ...formData, title: e.target.value });
                    // }}
                  />
                  <FormLabel>4. CAN YOU AGREE TO THAT?</FormLabel>
                  <Typography variant='body1' sx={{fontSize: '10px'}}>The last part of using Non-Violent Communication when you're in conflict is to check if the other person is willing to meet your needs. They may say no, and that is their choice. What does it mean to you if they are not willing to meet your needs?</Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="feeling"
                    label="Your needs request statement will appear here as you draft it."
                    name="feeling"
                    // defaultValue={formData.title}
                    // onChange={(e) => {
                    //   setFormData({ ...formData, title: e.target.value });
                    // }}
                  />
                  <Typography variant='body1' sx={{fontSize: '10px'}}>Here is your statement to edit and consider. You can edit it right here. You can memorize it to use in conversation with whomever you are in conflict with. You can read it out loud to them if you need to. You can send it in a text-message or email or letter. You can keep it to yourself, sometimes it is nice just to consider it.</Typography>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Button type='submit'>submit edits</Button>
                  </Grid>
                </Grid>
              </Grid>
              </Box>
            </Box>
          </Card>
        </CardContent>
      </Card>


      <h2>Create a Needs Statement</h2>
      <p>Conflict description: ${description}</p>
      <h4>needs statement:</h4>
      <p> "When you _____, I felt {feeling}, in the future I need {need}".</p>
      <Link to={`/conflictList`} className='btn'>accept</Link>

    </section>
  );
};

NeedsStatement.propTypes = {
  conflictList: PropTypes.array
};

export default NeedsStatement;