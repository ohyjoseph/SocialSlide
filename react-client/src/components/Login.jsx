import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  loginHandler() {
    console.log(this.state.username, this.state.password)
    axios.post('/login', {username: this.state.username, password: this.state.password})
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
        <span> Username <input className="form-control" type="text" value={this.state.username} onChange={this.handleChangeUsername}/> </span>
        <span> Password <input className="form-control" type="password" value={this.state.password} onChange={this.handleChangePassword}/> </span>
        <button onClick={() => (this.loginHandler())}> Login </button>
      </div>
    )
  }
}

export default Login;