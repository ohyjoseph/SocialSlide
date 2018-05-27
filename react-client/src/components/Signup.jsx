import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      usernameText: '',
      passwordText: '',
      avatarUrl: ''
    }
    this.handleChangeUsernameText = this.handleChangeUsernameText.bind(this);
    this.handleChangePasswordText = this.handleChangePasswordText.bind(this);
  }

  handleChangeUsernameText(event) {
    this.setState({usernameText: event.target.value});
  }

  handleChangePasswordText(event) {
    this.setState({passwordText: event.target.value});
  }

  signupHandler() {
    axios.post('/signup', {username: this.state.usernameText, password: this.state.passwordText})
      .then((response) => {
        console.log(response.data.command);
        if ('SIGNUP',response.data.command === 'INSERT') {
          window.localStorage.setItem('loggedIn', 'true');
          window.localStorage.setItem('username', this.state.usernameText);
          if (this.state.avatarUrl === '') {
            window.localStorage.setItem('avatarUrl', undefined);
          } else {
            window.localStorage.setItem('avatarUrl', this.state.avatarUrl);
          }
          console.log(`LOGGED IN: ${window.localStorage.getItem('loggedIn')} USERNAME: ${window.localStorage.getItem('username')} AVATAR: ${window.localStorage.getItem('avatarUrl')}`);
        } else {
          console.error('ERROR username already exists');
        }
      }).catch((err) => {
        console.error('ERROR signup:', err);
      })
  }

  render () {
    return (
      <div>
        <h1>Signup</h1>
        <span> Username <input className="form-control" type="text" value={this.state.usernameText} onChange={this.handleChangeUsernameText}/> </span>
        <span> Password <input className="form-control" type="password" value={this.state.passwordText} onChange={this.handleChangePasswordText}/> </span>
        <button onClick={() => (this.signupHandler())}> Signup </button>
      </div>
    )
  }
}

export default Signup;