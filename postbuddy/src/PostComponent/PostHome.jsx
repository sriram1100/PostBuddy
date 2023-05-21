import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import LoginSignup from '../LoginSignupComponent/LoginSignupButtons'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
      marginLeft: '25%',
      marginTop:'2%',
      marginBottom:'2%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  buddyicon: {
    fontSize: 30
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentDisplay: {
      textAlign: 'left'
  },
  commentDisplayContent: {
      textAlign: 'left'
  }
}));

function PostHome({match}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  useEffect(()=> {
    fetchPost();
    fetchComment();
   },[]);

   const [post,setPost] = useState([]);
   const [comments,setComments] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchPost = async () => {
    const fetchThePosts = await fetch(
        `http://localhost:8081/posts/${match.params.postid}`
    ); 
    const post = await fetchThePosts.json();
    setPost(post);
  }

    const fetchComment = async () => {
    const fetchTheComments = await fetch(
        `http://localhost:8081/comments/post/${match.params.postid}`
    ); 
    const comments = await fetchTheComments.json();
    setComments(comments);
   }

  return (
      <div>
    <LoginSignup login={true} signup={true} logout={false}/>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Tooltip title = {post.postedby}>
          <FaceIcon aria-label="buddyicon" className={classes.buddyicon}/>
          </Tooltip>
        }
        
        title={
        <Typography variant="body2" color="textSecondary" gutterBottom> 
        Posted by: 
        <Typography variant="h5" color="textPrimary" gutterBottom> 
         {post.postedby}
         </Typography>
        </Typography>
        }
        subheader={post.postdate}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
          <Typography variant="h5" color="textPrimary" gutterBottom>
              Comments
          </Typography>
          { comments.map((comment) => (
              <div> 
                <Typography className={classes.commentDisplay} variant="subtitle2" color="textPrimary" gutterBottom>
                    {comment.postedby}:
                </Typography> 
                <Typography className={classes.commentDisplayContent} paragraph>
                {comment.content}
              </Typography>
              </div>
          ))} 
        </CardContent>
      </Collapse>
    </Card>
    <Link style={{textDecoration:'none'}} href={`/`}>
      <Button variant="contained" color="primary">
            Home 
      </Button>
      </Link>
    </div>
  );
}

export default PostHome