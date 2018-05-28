import React from 'react';

const FriendRequestListEntry = (props) => (
  <div>
    {props.friendRequest.sender}
    {/* <a href={props.repo.user_url}><img src={props.repo.avatar} alt={props.repo.username} width="60" /></a> <a href={props.repo.repo_url}>{props.repo.repo_name}</a> */}
  </div>
)

export default FriendRequestListEntry;