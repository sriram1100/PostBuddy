import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container,InputLabel, Typography, Icon } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '75ch',
        },
      },
}));


function ModalCommentForm(props) {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [content,setContent] = useState(props.comment.content);
    const [formOutput,setFormOutput] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        const ModifiedContent = content;
        const currentCommentid = props.comment._id;
        axios.patch(`http://localhost:8081/comments/${currentCommentid}`, {
            content: ModifiedContent
        })
        .then( response => {
            setFormOutput(response.data);
            setIsSubmitted(true);
            window.location.reload();
            })
    }

    return (
       <div className={classes.root}>
         <form onSubmit = {submitHandler}>
            <Container>
            <TextField
             id="outlined-textarea"
             label="Edit Post"
           multiline
           variant="outlined"
           rowsMax = {10}
           value={content} 
           onChange={e => setContent(e.target.value)}
           />
           <IconButton type = "submit" data-testid="button">
                  <DoneAllIcon/>
           </IconButton>
            </Container>
        </form> 
       </div>
    );
}

export default ModalCommentForm;