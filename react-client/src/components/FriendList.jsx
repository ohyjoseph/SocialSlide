import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import FriendListEntry from './FriendListEntry.jsx';

class FriendList extends React.Component {  
  constructor(props) {
    super(props);
    this.selectFriendsHandler = this.selectFriendsHandler.bind(this);
  }

  componentDidMount() {
    this.selectFriendsHandler().then((friends) => {
      console.log('COMPONENTDIDMOUNT', friends);
      this.props.updateFriends(friends);
    });
  }
  
  selectFriendsHandler() {
    return axios.post('/friends', {username: window.localStorage.getItem('username')})
      .then((response) => {
        console.log(`FRIENDS: ${JSON.stringify(response.data)}`);
        return response.data;
      }).catch((err) => {
        console.error('ERROR selecting friends:', err);
      })
  }
  
  render () {
    return (
      <div>
      <br></br>
      <h4>Friends</h4>
        {this.props.friends.map((friend, ind) =>
          <FriendListEntry key={ind} friend={friend}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFriends: (friends) => { dispatch({type: 'UPDATE_FRIENDS', friends: friends})}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FriendList);