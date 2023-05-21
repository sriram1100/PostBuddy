import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container} from '@material-ui/core'
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


function CommentWriteForm(props) {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [content,setContent] = useState([]);
    const [formOutput,setFormOutput] = useState(false);
    const [placeHolderText,setPlaceHolderText] = useState("Any thoughts on the post?...please leave your comment here");
    const submitHandler = (e) => {
        e.preventDefault();
        const currentUserName = props.user;
        const commentContent = content;
        const currentPostId = props.postid;
        axios.post(`http://localhost:8081/comments/`, {
            postedby: currentUserName,
            postid: currentPostId,
            content: commentContent
        })
        .then( response => {
            setFormOutput(response.data);
            setIsSubmitted(true);
            console.log("able to increment count");
            axios.patch(`http://localhost:8081/posts/increaseCommentCount/${currentPostId}`)
           .then(response => {
            window.location.reload();
            })
        })
    }

    return (
       <div className={classes.root}>
         <form onSubmit = {submitHandler}>
            <Container>
            <TextField
             id="outlined-textarea"
             label="New Comment"
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

export default CommentWriteForm;