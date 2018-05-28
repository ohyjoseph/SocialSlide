import React from 'react';
import axios from 'axios';
import FriendRequestListEntry from './FriendRequestListEntry.jsx';

class FriendRequestList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      friendRequests: []
    }
    this.selectFriendRequestsHandler = this.selectFriendRequestsHandler.bind(this);
  }

  componentWillMount() {
    this.selectFriendRequestsHandler();
  }
  
  selectFriendRequestsHandler() {
    axios.post('/friendrequests', {receiver: window.localStorage.getItem('username')})
      .then((response) => {
        console.log(`FRIEND REQUESTS: ${JSON.stringify(response.data)}`);
        this.setState({
          friendRequests: response.data
        });
      }).catch((err) => {
        console.error('ERROR selecting friend requests:', err);
      })
  }
  
  render () {
    return (
      <div>
      <h4>Friend Requests</h4>
        {this.state.friendRequests.map((friendRequest, ind) =>
          <FriendRequestListEntry key={ind} friendRequest={friendRequest}/>
        )}
      </div>
    )
  }
}

export default FriendRequestList;