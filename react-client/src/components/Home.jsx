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
  }

  handleChangeFriendText(event) {
    this.setState({friendText: event.target.value});
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
        <span><input className="form-control" type="text" value={this.state.friendText} onChange={this.handleChangeFriendText}/> </span>
        <button onClick={() => (this.sendFriendRequestHandler())}> Send Friend Request </button>
        <FriendRequestList />
        <FriendList />
      </div>
    )
  }
}

export default Home;