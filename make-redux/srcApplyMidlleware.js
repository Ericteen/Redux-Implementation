const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error("Caught an exception!", err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}

let store = createStore(
  rootReducer,
  applyMiddleware(logger, crashReporter)
)

createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    // 判断第二个参数是否为 function, 是的话将其设为 Enhancer
    return enhancer(createStore)(reducer, preloadedState)
  }
  // ...
}

// applyMiddleware 作为 Enhancer 传入
const applyMiddleware = (...middlewares) => (createStore) => (...args) => {
  // 1.生成 store
  const store = createStore(...args)
  let dispatch = () => {
    throw new Error('Warning')
  }

  let chain = []

  const middlewareAPI = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args)
  }
  // 2.扩展 dispatch 的功能
  chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)(store.dispatch)

  return {
    ...store,
    dispatch,
  }
}
