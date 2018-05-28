import React from 'react';

const FriendListEntry = (props) => {

  return (
    <div>
      {/* {props.friend.sender} */}
      {props.friend.sender === window.localStorage.getItem('username') ? (props.friend.receiver) : (props.friend.sender)}
    </div>
  )
}

export default FriendListEntry;