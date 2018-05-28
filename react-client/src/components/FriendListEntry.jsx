import React from 'react';

const FriendListEntry = (props) => {

  return (
    <div>
      <a href={window.location.href + 'dm?username=' + props.friend.username}>{props.friend.username}</a>
    </div>
  )
}

export default FriendListEntry;