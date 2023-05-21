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
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmptyCommentHome from '../HomeComponent/EmptyCommentHome';
import CommentWriteForm from '../Forms/CommentWriteForm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Container } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import ModalCommentForm from '../Forms/ModalCommentForm';
import ModalPostForm from '../Forms/ModalPostForm';
import axios from 'axios';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: '89%',
    marginTop: '2%'
  },
  deleteandeditComment: {
    marginLeft: '80%'
  },
  paper: {
    position: 'absolute',
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function UserPostHome({match}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  useEffect(()=> {
    fetchPost();
    fetchComment();
    fetchUser();
    console.log(match);
   },[]);

   const [post,setPost] = useState([]);
   const [user,setUsers] = useState([]);
   const [comments,setComments] = useState([]);
   const [modalOpen,setModalOpen] = useState(false);
   const [modalPostId,setModalPostId] = useState([]);
   const [modalCommentId,setmodalCommentId] = useState([]);
   const [commentModalOpen,setCommentModalOpen] = useState([]);
   const [modalStyle] = useState(getModalStyle);
   const username=match.params.username; 

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

   const fetchUser = async () => {
    const fetchTheUsers = await fetch(
        `http://localhost:8081/users/${username}`
    ); 
    const user = await fetchTheUsers.json();
    setUsers(user);
}

 const handleDeleteClick = (commentId) => {
         axios.delete(`http://localhost:8081/comments/${commentId}`)
        .then( response => {
            axios.patch(`http://localhost:8081/posts/decreaseCommentCount/${post._id}`)
            .then(response => {
              window.location.reload();
            })

        })
 }
const handleModalOpen = (postId) => {
  setModalPostId(postId);
  setModalOpen(true);
};

const handleModalClose = () => {
  setModalOpen(false);
  setModalPostId([]);
};

const handleCommentModalOpen = (commentId) => {
  setmodalCommentId(commentId);
  setCommentModalOpen(true);
}

const handleCommentModalClose = () => {
  setCommentModalOpen(false);
  setmodalCommentId([]);
}

  return (
      <div>
          <Tooltip title={user.firstname + " " + user.lastname}>
          <Avatar className={classes.large} >
            <AccountCircleIcon/>
          </Avatar>
          </Tooltip>
          <LoginSignup login={false} signup={false} logout={true}/>
          
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Tooltip title = {post.postedby}>
          <FaceIcon aria-label="buddyicon" className={classes.buddyicon}/>
          </Tooltip>
        }
        action = { username === post.postedby && 
          
          <Container>
            <Tooltip title="edit the post">
            <IconButton aria-label="settings" onClick={()=>handleModalOpen(post._id)}>
              <EditIcon/>
            </IconButton>
            </Tooltip>
            <Modal
            open={modalOpen && modalPostId === post._id}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
            <h5 id="simple-modal-title">Hi {user.firstname}, please edit your post and save changes</h5>
             <p id="simple-modal-description">
              <ModalPostForm user={user} post={post}/>
            </p>
            </div>
          </Modal>
          </Container>
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
          { post.commentcount === 0 && <EmptyCommentHome/> }
          <CommentWriteForm user = {username} postid={post._id}/>
          <br/>
          { post.commentcount!==0 && comments.map((comment) => (
              <div> 
                  {
                  comment.postedby === username &&
                    <div className={classes.deleteandeditComment}>
                    <Tooltip title = "edit the comment">
                    <IconButton onClick={()=>handleCommentModalOpen(comment._id)}>
                   <EditIcon/>
                   </IconButton>
                   </Tooltip>
                   <Modal
                 open={commentModalOpen && modalCommentId === comment._id}
                 onClose={handleCommentModalClose}
                 aria-labelledby="simple-modal-title"
                 aria-describedby="simple-modal-description"
                 >
                <div style={modalStyle} className={classes.paper}>
               <Typography variant="subtitle1" id="simple-modal-title">Hi {user.firstname}, please edit your comment and save changes</Typography>
                <p id="simple-modal-description">
               <ModalCommentForm user={user} comment={comment}/>
               </p>
               </div>
               </Modal>

                 <Tooltip title = "delete the comment">
                 <IconButton onClick={()=>handleDeleteClick(comment._id)}>
                  <DeleteIcon/>
                 </IconButton>
                 </Tooltip>
                 </div>
                  }
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
    <Link style={{textDecoration:'none'}} href={`/home/${username}`}>
      <Button variant="contained" color="primary">
            Home 
      </Button>
      </Link>
    </div>
  );
}

export default UserPostHome