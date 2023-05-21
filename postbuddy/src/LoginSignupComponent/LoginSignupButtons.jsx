import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
      buttons: {
          marginLeft: '80%'
      }
  }));

function LoginSignup(props) {
    const classes = useStyles();
    const loginDisplay = props.login 
    const logoutDisplay = props.logout 
    const signupDisplay = props.signup 
   return(
       <div>
       <br/>
      {loginDisplay && <Link style={{textDecoration:'none'}} href={`/loginform`}><Button color="primary" variant="contained" className={classes.buttons}>Login</Button></Link>}
      {loginDisplay && <div><br/></div>}
      {logoutDisplay && <Link style={{textDecoration:'none'}} href={`/`}><Button color="primary" variant="contained" className={classes.buttons}>Logout</Button></Link>}
      {logoutDisplay && <div><br/></div>}
      {signupDisplay && <Link style={{textDecoration:'none'}} href={`/signupform`}><Button className={classes.buttons} variant="contained">Signup</Button></Link>}
      </div>
   )
}

export default LoginSignup