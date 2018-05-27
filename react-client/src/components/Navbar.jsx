import React from 'react';
import {NavLink} from 'react-router-dom';

const ListItem = (props) => (  
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
    </ul>
)

export default ListItem;