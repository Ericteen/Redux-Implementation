/**
 * 
 * @desc  combineReducers Implementation
 * @param {object} reducers 
 */
const combineReducers = (reducers) => 
  (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        )
        return nextState
      },
      {}
    )
  }
