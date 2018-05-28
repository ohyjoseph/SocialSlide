import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      usernameText: '',
      passwordText: '',
    }
    this.handleChangeUsernameText = this.handleChangeUsernameText.bind(this);
    this.handleChangePasswordText = this.handleChangePasswordText.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
  }

  handleChangeUsernameText(event) {
    this.setState({usernameText: event.target.value});
  }

  handleChangePasswordText(event) {
    this.setState({passwordText: event.target.value});
  }

  handleKeyPressEnter(event) {
    if(event.key == 'Enter'){
      this.loginHandler();
    }
  }

  loginHandler() {
    axios.post('/login', {username: this.state.usernameText, password: this.state.passwordText})
      .then((response) => {
        if(response.data.length > 0) {
          window.localStorage.setItem('loggedIn', 'true');
          window.localStorage.setItem('username', response.data[0].username);
          window.localStorage.setItem('avatarUrl', response.data[0].avatarUrl);
          console.log(`LOGGED IN: ${window.localStorage.getItem('loggedIn')} USERNAME: ${window.localStorage.getItem('username')} AVATAR: ${window.localStorage.getItem('avatarUrl')}`);
          window.location.reload();
        } else {
          window.alert('Not a correct username and password');
        }
      }).catch((err) => {
        console.error('ERROR login:', err);
      })
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <span> Username <input className="form-control" type="text" value={this.state.usernameText} onChange={this.handleChangeUsernameText} onKeyPress={this.handleKeyPressEnter}/> </span>
        <span> Password <input className="form-control" type="password" value={this.state.passwordText} onChange={this.handleChangePasswordText} onKeyPress={this.handleKeyPressEnter}/> </span>
        <button className='btn btn-primary' onClick={() => (this.loginHandler())}> Login </button>
      </div>
    )
  }
}

export default Login;