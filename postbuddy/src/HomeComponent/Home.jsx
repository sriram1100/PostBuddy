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
    }
  }));

function Home({match}) {

    useEffect(()=> {
        fetchPosts();
    },[]);
    const [posts,setPosts] = useState([]);
    const classes = useStyles();
    const fetchPosts = async () => {
        const fetchThePosts = await fetch(
            `http://localhost:8081/posts/`
        ); 
        const posts = await fetchThePosts.json();
        setPosts(posts);
    }

    return(
        
        <div>
          <LoginSignup login={true} signup={true} logout={false}/>
            { posts.length === 0 && <EmptyBodyHome/> }
       { posts.length!==0 && posts.map((post)=> (
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

        {post.commentcount !== 0 &&
      <Tooltip title = {"view all " + post.commentcount + " comments"}>

        <IconButton
          className={classes.comment}
          aria-label="show more"
        >
          <Link style={{textDecoration:'none'}} href={`/detailedPostHome/${post._id}`}>
          <Badge badgeContent={post.commentcount} color="secondary">
          
          <CommentIcon/>
        
          </Badge>
          </Link>
        </IconButton>
        </Tooltip>
        }
        {
          post.commentcount === 0 &&
          <Tooltip title = {"This post does not have any comments yet"}>
            
            <IconButton
              className = {classes.nocomment}
              aria-label="No comments"
            >
              <Badge badgeContent={post.commentcount} color="secondary">
              <CommentIcon color="disabled"/>
              </Badge>
            </IconButton>
            
            </Tooltip>
        }
      </CardActions>
    </Card>
       ))}
        </div>
    )
}

export default Home;