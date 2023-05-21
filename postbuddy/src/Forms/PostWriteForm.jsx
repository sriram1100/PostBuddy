import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container } from '@material-ui/core'
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
          width: '100ch',
        },
      },
}));


function PostWriteForm(props) {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [content,setContent] = useState([]);
    const [formOutput,setFormOutput] = useState(false);
    const [placeHolderText,setPlaceHolderText] = useState("What's in your mind?...Write your new post here");
    const submitHandler = (e) => {
        e.preventDefault();
        const currentUserName = props.user;
        const postContent = content;
        const commentCount = 0;
        axios.post(`http://localhost:8081/posts/`,{
            postedby: currentUserName,
            content: postContent,
            commentcount: commentCount
        })
        .then( response => {
            console.log(response);
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
             label="New Post"
            placeholder={placeHolderText}
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

export default PostWriteForm;