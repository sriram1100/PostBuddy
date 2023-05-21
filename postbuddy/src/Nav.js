import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > svg': {
      margin: theme.spacing(1),
    },
  },
}));


function Nav() {
    const navstyle = {
        color:'white'
    };

    const classes = useStyles();

  return (
    <nav className={classes.root}>
        <h2> Post Buddy </h2>
    </nav>
  );
}

export default Nav;
