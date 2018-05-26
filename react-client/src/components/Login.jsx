import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  login() {
    axios.post('/login', {username: 'he', password: 'as'})
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.error('ERROR login:', err);
      })
  }

  render () {
    return (
    <div>
      <h1>Login</h1>
      <button onClick={this.login}>
        Login Test
      </button>
    </div>)
  }
}

export default Login;