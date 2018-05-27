import React from 'react';
import {NavLink} from 'react-router-dom';
import { BrowserRouter as Router, Link, Redirect, Prompt} from 'react-router-dom';

const Navbar = (props) => {
  
  let logoutHander = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');
    console.log('LOGGED OUT');
  }

  return (
    <ul>
      <li>
        <NavLink to="/" exact activeStyle={
          { color:'green' }
        }>Home</NavLink>
      </li>
      <li>
        <NavLink to="/login" exact activeStyle={
          { color:'green' }
        }>Login</NavLink>
      </li>
      <li>
        <button onClick={logoutHander}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default Navbar;