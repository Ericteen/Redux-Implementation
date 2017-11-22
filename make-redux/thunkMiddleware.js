function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    // 判断 action 的类型
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

const thunk = createThunkMiddleware()

export default thunk
