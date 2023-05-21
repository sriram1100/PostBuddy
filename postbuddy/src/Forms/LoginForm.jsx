import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container,InputLabel, Typography } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { Alert, AlertTitle } from '@material-ui/lab';
import {Redirect} from "react-router-dom";
import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


function LoginForm({match}) {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName,setUserName] = useState([]);
    const [userPassword,setUserPassword] = useState([]);
    const [formOutput,setFormOutput] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        const currentUserName = userName
        const currentUserPassword = userPassword
        axios.get(`http://localhost:8081/users/login/${currentUserName}/${currentUserPassword}`)
        .then( response => {
            setFormOutput(response.data);
            setIsSubmitted(true);
        })
    }
    const alertHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(false);
    }
    return (
       <div className={classes.root}>
           <h2> Login Form</h2><br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="userName" required>Username: </InputLabel>
            <Input type="text" name="userName" value={userName} onChange={e => setUserName(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="userPassword" required>Password: </InputLabel>
            <Input type="password" name="userPassword"  value={userPassword} onChange={e => setUserPassword(e.target.value)} required/>
            <br/><br/>
            <Button variant="outlined" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form>
        <br/>
         <Typography variant="caption" display="block" gutterBottom>
         New to Post Buddy? <Link style={{textDecoration:'none'}} href={`/signupform`}><Button className={classes.buttons}>Sign Up</Button></Link>
        </Typography>
        <br/>
        <Link style={{textDecoration:'none'}} href={`/`}>
        <Button variant="contained" color="primary">
            Home 
        </Button>
        </Link>
        <br/><br/>
        <Alert severity="info">
       <AlertTitle>Form Info</AlertTitle>
       * indicates the  <strong>mandatory</strong> fields
       </Alert>
        {isSubmitted && formOutput && <Redirect to={`/home/${userName}`}/>}
        {isSubmitted && formOutput===false && <Alert severity="error" onClose={alertHandler}>Either username or password is invalid!</Alert>} 
       </div>
    );
}

export default LoginForm;