import React from 'react';
import axios from 'axios';
import FriendListEntry from './FriendListEntry.jsx';

class FriendList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
    this.selectFriendsHandler = this.selectFriendsHandler.bind(this);
  }

  componentWillMount() {
    this.selectFriendsHandler();
  }
  
  selectFriendsHandler() {
    axios.post('/friends', {username: window.localStorage.getItem('username')})
      .then((response) => {
        console.log(`FRIENDS: ${JSON.stringify(response.data)}`);
        this.setState({
          friends: response.data
        });
      }).catch((err) => {
        console.error('ERROR selecting friends:', err);
      })
  }
  
  render () {
    return (
      <div>
      <h4>Friends</h4>
        {this.state.friends.map((friend, ind) =>
          <FriendListEntry key={ind} friend={friend}/>
        )}
      </div>
    )
  }
}

export default FriendList;