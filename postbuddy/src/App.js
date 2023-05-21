import React from 'react';
import './App.css';
import Nav from './Nav';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Home from './HomeComponent/Home'
import PostHome from './PostComponent/PostHome'
import LoginForm from './Forms/LoginForm'
import SignupForm from './Forms/SignUpForm'
import UserHome from './HomeComponent/UserHome'
import UserPostHome from './PostComponent/UserPostHome'
function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
       <Route path = '/' exact component = { Home } />
       <Route path = '/detailedPostHome/:postid' exact component = {PostHome}/>
       <Route path = '/home/:username' component = {UserHome}/>
       <Route path = '/loginform' component = {LoginForm}/>
       <Route path = '/signupform' component = {SignupForm}/>
       <Route path = '/detailedPostHome/user/:username/:postid' component = {UserPostHome}/>
      </Switch>
    </div>
    </Router>
  );
}


export default App;
