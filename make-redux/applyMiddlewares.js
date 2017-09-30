const applyMiddleware = (store, middlewares) => {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware => 
    dispatch = middleware(store)(dispatch)
  )
  
  return Object.assign({}, store, dispatch)
}

// middlewares
const logger = store => next => action => {
  console.log('Dispatching: ', action)
  let reslt = next(action)
  console.log('Next state: ', store.getState())
  return result
}

// redux-thunk redux-promise wraps the store's dispatch method and allows you to dispatch
// something other than actions, for example, functions and promises
const thunk = store => next => action => 
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)
