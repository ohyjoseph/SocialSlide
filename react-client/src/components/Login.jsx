import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      usernameText: '',
      passwordText: '',
      session: {
        loggedIn: false,
        username: undefined,
        avatarUrl: undefined
      }
    }
    console.log(this.props);
    this.handleChangeUsernameText = this.handleChangeUsernameText.bind(this);
    this.handleChangePasswordText = this.handleChangePasswordText.bind(this);
  }

  handleChangeUsernameText(event) {
    this.setState({usernameText: event.target.value});
  }

  handleChangePasswordText(event) {
    this.setState({passwordText: event.target.value});
  }

  loginHandler() {
    axios.post('/login', {username: this.state.usernameText, password: this.state.passwordText})
      .then((response) => {
        let session = Object.assign({}, this.state.session);
        session.loggedIn = true;
        session.username = response.data[0].username,
        session.avatarUrl = response.data[0].avatarUrl

        this.setState({
          session: session
        });
        console.log(`LOGGED IN: ${this.state.session.loggedIn} USERNAME: ${this.state.session.username} AVATAR: ${this.state.session.avatarUrl}`);
      }).catch((err) => {
        console.error('ERROR login:', err);
      })
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <span> Username <input className="form-control" type="text" value={this.state.usernameText} onChange={this.handleChangeUsernameText}/> </span>
        <span> Password <input className="form-control" type="password" value={this.state.passwordText} onChange={this.handleChangePasswordText}/> </span>
        <button onClick={() => (this.loginHandler())}> Login </button>
      </div>
    )
  }
}

export default Login;