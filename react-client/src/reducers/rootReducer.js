const initState = {
  friends: []
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'UPDATE_FRIENDS') {
    return {
      friends: action.friends
    }
  }
  return state;
}

export default rootReducer;