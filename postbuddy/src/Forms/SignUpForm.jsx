import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container,InputLabel } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { Alert, AlertTitle } from '@material-ui/lab';
import {Redirect} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
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


function SignupForm({match}) {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName,setUserName] = useState([]);
    const [userPassword,setUserPassword] = useState([]);
    const [userRePassword,setUserRePassword] = useState([]);
    const [userFirstName,setUserFirstName] = useState([]);
    const [userLastName,setUserLastName] = useState([]);
    const [userEmail,setUserEmail] = useState("");
    const [validForm,setValidForm] = useState(false);
    const [errorflag,setErrorFlag] = useState(true);
    const [formRequestComplete,setFormRequestComplete] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();

        if(userPassword === userRePassword) {
            setErrorFlag(false)
        } else {
            setErrorFlag(true)
        }

        if(errorflag === false) {
            setFormRequestComplete(false);
            axios.post(`http://localhost:8081/users/`, {
                username: userName,
                password: userPassword,
                firstname: userFirstName,
                lastname: userLastName,
                email: userEmail
            })
            .then( response => {
            setValidForm(response.data);
            setFormRequestComplete(true);
        })
    }

        setIsSubmitted(true);
    }
    const alertHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(false);
    }
    return (
       <div className={classes.root}>
           <h2> Signup Form</h2><br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="userName" required>Username: </InputLabel>
            <Input type="text" name="userName" value={userName} onChange={e => setUserName(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="userFirstName" required>First Name: </InputLabel>
            <Input type="text" name="userName" value={userFirstName} onChange={e => setUserFirstName(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="userLastName" required>Last Name: </InputLabel>
            <Input type="text" name="userLastName" value={userLastName} onChange={e => setUserLastName(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="userPassword" required>Password: </InputLabel>
            <Input type="password" name="userPassword"  value={userPassword} onChange={e => setUserPassword(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="userRePassword" required>Re-enter Password: </InputLabel>
            <Input type="password" name="userRePassword"  value={userRePassword} onChange={e => setUserRePassword(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="userEmail">Email: </InputLabel>
            <Input type="email" name="userEmail"  value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
            <br/><br/>
            <Button variant="outlined" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form>
        <br/>
        <Typography variant="caption" display="block" gutterBottom>
         Already have an account? <Link style={{textDecoration:'none'}} href={`/loginform`}><Button className={classes.buttons}>Login</Button></Link>
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
        {isSubmitted && validForm && errorflag===false && <Redirect to={`/home/${userName}`}/>}
        {isSubmitted && errorflag && <Alert severity="error" onClose={alertHandler}>The password mismatch has occured!</Alert>}
        {isSubmitted && formRequestComplete && validForm===false && errorflag===false && <Alert severity="error" onClose={alertHandler}>The user with the given username already exists!</Alert>}
       </div>
    );
}

export default SignupForm;