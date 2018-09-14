import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import FriendRequestListEntry from './FriendRequestListEntry.jsx';

class FriendRequestList extends React.Component {  
  constructor(props) {
    super(props);
    this.selectFriendRequestsHandler = this.selectFriendRequestsHandler.bind(this);
  }

  componentWillMount() {
    this.selectFriendRequestsHandler().then((friendRequests) => {
      this.props.updateFriendRequests(friendRequests);
      console.log('PROPS',this.props)
    });
  }
  
  selectFriendRequestsHandler() {
    return axios.post('/friendrequests', {receiver: window.localStorage.getItem('username')})
      .then((response) => {
        console.log(`FRIEND REQUESTS: ${JSON.stringify(response.data)}`);
        return response.data;
      }).catch((err) => {
        console.error('ERROR selecting friend requests:', err);
      })
  }
  
  render () {
    return (
      <div>
      <h4>Friend Requests</h4>
        {this.props.friendRequests.map((friendRequest, ind) =>
          <FriendRequestListEntry key={ind} friendRequest={friendRequest}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friendRequests: state.friendRequests,
    friends: state.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFriendRequests: (friendRequests) => {dispatch({type: 'UPDATE_FRIEND_REQUESTS', friendRequests: friendRequests})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestList);