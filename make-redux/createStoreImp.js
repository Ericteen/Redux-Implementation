/**
 * 
 * 
 * @param {function} reducer 
 * @returns 
 */
const createStore = reducer => {
  let state = {};
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      // 模拟 unsubscribe 方法
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // 初始化
  dispatch({type: '@init'});

  return {
    getState,
    dispatch,
    subscribe
  };
};
