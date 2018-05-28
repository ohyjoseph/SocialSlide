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
    <div className='container-fluid bg-light'>
      <h1 className='navbar-header'>
      <NavLink to="/" exact>Social Slide</NavLink>
      </h1>
      <ul className='list-inline'>
        <li className='list-inline'>
          <NavLink to="/login" exact activeStyle={
            { color:'green' }
          }>Login</NavLink>
        </li>
        <li className='list-inline'>
          <button className='btn btn-danger' onClick={logoutHander}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;