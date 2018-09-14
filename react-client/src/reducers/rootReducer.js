const initState = {
  friends: [],
  friendRequests: []
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'UPDATE_FRIENDS') {
    return {
      friends: action.friends,
      friendRequests: state.friendRequests
    }
  }
  if (action.type === 'UPDATE_FRIEND_REQUESTS') {
    return {
      friends: state.friends,
      friendRequests: action.friendRequests
    }
  }
  return state;
}

export default rootReducer;