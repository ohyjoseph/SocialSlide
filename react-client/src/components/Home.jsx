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
        if (response.data.command === 'INSERT') {
          console.log(`FRIEND REQUEST SENT TO ${this.state.friendText}`);
        } else {
          console.error('ERROR sending friend request');
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
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.friendText} onChange={this.handleChangeFriendText} onKeyPress={this.handleKeyPressEnter}/>
          <button className="btn btn-outline-info my-2 my-sm-0" onClick={() => (this.sendFriendRequestHandler())}> Send Friend Request </button>
        </nav>
        <FriendRequestList />
        <FriendList />
      </div>
    )
  }
}

export default Home;