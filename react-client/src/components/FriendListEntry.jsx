import React from 'react';

const FriendListEntry = (props) => {

  return (
    <div>
      {props.friend.username}
    </div>
  )
}

export default FriendListEntry;