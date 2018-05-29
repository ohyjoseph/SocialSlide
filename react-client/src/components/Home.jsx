import React from 'react';
import axios from 'axios';
import FriendRequestList from './FriendRequestList.jsx';
import FriendList from './FriendList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendText: ''
    }
    this.handleChangeFriendText = this.handleChangeFriendText.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
  }

  handleChangeFriendText(event) {
    this.setState({friendText: event.target.value});
  }

  handleKeyPressEnter(event) {
    if(event.key == 'Enter'){
      this.sendFriendRequestHandler();
    }
  }

  sendFriendRequestHandler() {
    axios.post('/friendrequest', {sender: window.localStorage.getItem('username'), receiver: this.state.friendText})
      .then((response) => {
        console.log(response)
        if (response.data.command === 'INSERT') {
          console.log(`FRIEND REQUEST SENT TO ${this.state.friendText}`);
        } else {
          console.error('ERROR sending friend request', response.data.code);
          if (response.data.code === '23505') {
            window.alert(`Request already sent to ${this.state.friendText}`);
          } else if (response.data.code === '23503') {
            window.alert(`User does not exist`);
          } else {
            window.alert('Cannot send request to yourself');
          }
        }
      }).catch((err) => {
        console.error('ERROR login:', err);
      })
  }

  render () {
    return (
      <div>
        <h2>Welcome {window.localStorage.username}</h2>
        <nav className="navbar navbar-light bg-light form-inline">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" value={this.state.friendText} onChange={this.handleChangeFriendText} onKeyPress={this.handleKeyPressEnter}/>
          <button className="btn btn-outline-info my-2 my-sm-0" onClick={() => (this.sendFriendRequestHandler())}> Send Friend Request </button>
        </nav>
        <FriendRequestList />
        <FriendList />
      </div>
    )
  }
}

export default Home;