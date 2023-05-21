import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EmptyBodyHome from './EmptyBodyHome';
import CommentIcon from '@material-ui/icons/Comment';
import Badge from '@material-ui/core/Badge';
import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link';
import LoginSignup from '../LoginSignupComponent/LoginSignupButtons';
import PostWriteForm from '../Forms/PostWriteForm';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Container } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import ModalPostForm from '../Forms/ModalPostForm';

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
    expandOpen: {
      transform: 'rotate(0deg)',
    },
    buddyicon: {
      fontSize: 30
    },
    nocomment: {
      marginLeft: 'auto'
    },
    comment: {
      marginLeft: 'auto'
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginLeft: '89%',
        marginTop: '2%'
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

function UserHome({match}) {

    useEffect(()=> {
        fetchPosts();
        fetchUser();
    },[]);
    const [posts,setPosts] = useState([]);
    const [user,setUsers] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [modalPostId,setModalPostId] = useState([]);
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const username = match.params.username 
    const fetchPosts = async () => {
        const fetchThePosts = await fetch(
            `http://localhost:8081/posts/`
        ); 
        const posts = await fetchThePosts.json();
        setPosts(posts);
    }
    const fetchUser = async () => {
        const fetchTheUsers = await fetch(
            `http://localhost:8081/users/${username}`
        ); 
        const user = await fetchTheUsers.json();
        setUsers(user);
    }

    const handleModalOpen = (postId) => {
      setModalPostId(postId);
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
      setModalPostId([]);
    };

    
  

    return(
        
        <div>
            <Tooltip title={user.firstname + " " + user.lastname}>
          <Avatar className={classes.large} >
            <AccountCircleIcon/>
          </Avatar>
          </Tooltip>
          <LoginSignup login={false} signup={false} logout={true}/>
            { posts.length === 0 && <EmptyBodyHome/> }
         <PostWriteForm user = {username}/>
       { posts.length!==0 && posts.map((post)=> (
       <Card className={classes.root}>
      <CardHeader
        avatar={
          <Tooltip title = {post.postedby}>
          <FaceIcon aria-label="buddyicon" className={classes.buddyicon}/>
          </Tooltip>
        }
        action = { username === post.postedby && 
            <Container>
            <IconButton aria-label="settings" onClick={()=>handleModalOpen(post._id)}>
              <EditIcon/>
            </IconButton>
            <Modal
            open={modalOpen && modalPostId === post._id}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
            <Typography variant="subtitle1" id="simple-modal-title">Hi {user.firstname}, please edit your post and save changes</Typography>
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

        {post.commentcount !== 0 &&
      <Tooltip title = {"please add a comment or view all " + post.commentcount + " comments"}>

        <IconButton
          className={classes.comment}
          aria-label="show more"
        >
          <Link style={{textDecoration:'none'}} href={`/detailedPostHome/user/${username}/${post._id}`}>
          <Badge badgeContent={post.commentcount} color="secondary">
          
          <CommentIcon/>
        
          </Badge>
          </Link>
        </IconButton>
        </Tooltip>
        }
        {
          post.commentcount === 0 &&
          <Tooltip title = {"This post does not have any comments yet, please add a comment"}>
            
            <IconButton
              className = {classes.nocomment}
              aria-label="No comments"
            >
              <Link style={{textDecoration:'none'}} href={`/detailedPostHome/user/${username}/${post._id}`}>
              <Badge badgeContent={post.commentcount} color="secondary">
              <AddCommentIcon/>
              </Badge>
              </Link>
            </IconButton>
            
            </Tooltip>
        }
      </CardActions>
    </Card>
       ))}
        </div>
    )
}

export default UserHome;