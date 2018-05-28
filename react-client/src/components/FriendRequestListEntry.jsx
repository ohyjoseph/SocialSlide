import React from 'react';
import axios from 'axios';

const FriendRequestListEntry = (props) => {
  
let acceptFriendRequestHandler = () => {
  axios.put('/friendrequest', {sender: props.friendRequest.sender, receiver: window.localStorage.getItem('username'), wasAccepted: true})
    .then((response) => {
      console.log(`ACCEPTED FRIEND REQUEST FROM ${props.friendRequest.sender}`);
    }).catch((err) => {
      console.error('ERROR accepting friend request:', err);
    })
}

let rejectFriendRequestHandler = () => {
  axios.put('/friendrequest', {sender: props.friendRequest.sender, receiver: window.localStorage.getItem('username'), wasAccepted: false})
    .then((response) => {
      console.log(`REJECTED FRIEND REQUEST FROM ${props.friendRequest.sender}`);
    }).catch((err) => {
      console.error('ERROR rejecting friend request:', err);
    })
}

  return (
    <div>
      {props.friendRequest.sender}
      <button onClick={acceptFriendRequestHandler}>
        Accept
      </button>
      <button onClick={rejectFriendRequestHandler}>
        Reject
      </button>
      {/* <a href={props.repo.user_url}><img src={props.repo.avatar} alt={props.repo.username} width="60" /></a> <a href={props.repo.repo_url}>{props.repo.repo_name}</a> */}
    </div>
  )
}

export default FriendRequestListEntry;