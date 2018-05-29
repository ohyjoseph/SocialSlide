import React from 'react';
import {NavLink} from 'react-router-dom';
import { BrowserRouter as Router, Link, Redirect, Prompt} from 'react-router-dom';

const Navbar = (props) => {
  
  let logoutHander = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');
    console.log('LOGGED OUT');
    window.location.reload();
  }

  return (
    window.localStorage.loggedIn === 'true' ? 
    <div className='container-fluid bg-light'>
      <h1 className='navbar-header'>
      <NavLink to="/" exact>Social Slide</NavLink>
      </h1>
      <button className='btn btn-danger' onClick={logoutHander}>
        Logout
      </button>
    </div>
    :
    <div className='container-fluid bg-light'>
      <h1 className='navbar-header'>
      <NavLink to="/" exact>Social Slide</NavLink>
      </h1>
    </div>
  )
}

export default Navbar;