const bindActionCreator = (creator, dispatch) => {
  return (...args) => dispatch(creator(...args))
}

export const bindActionCreators = (creators, dispatch) => {
  let bound = {}
  Object.keys(creators).forEach((v) => {
    let creator = creators[v]
    bound[v] = binsActionCreator(creator, dispatch)
  })
  return bound
}

// 或者写成

export const bindActionCreators = (creators, dispatch) => {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(item, dispatch)
    return ret
  }, {})
}
