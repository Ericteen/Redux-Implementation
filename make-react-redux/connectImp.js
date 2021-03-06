/**
 * @desc function
 * 
 * @param {object} state 
 * @returns 
 */
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter,
    )
  }
}

/**
 * 
 * 
 * @param {function} { dispatch } 
 * @returns 
 */
const mapDispatchToProps = ({ dispatch }) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
}

export /**
 * 
 * @desc  connect 高阶函数模拟
 *        pure component 组件的渲染只依赖传入的 props 和自身的 state
 *        因其将 dumb 组件和 context 连接起来 故取名 connect
 *        利用 context 特性 取到 store
 *        用 getChildContext() 将 store 放到 Index 的 context 里面
 *        这样每个组件就能获取到 store 了
 * @param {function} mapStateToProps 
 * @param {function} mapDispatchToProps 
 */
const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object,
    }

    render() {
      const {store} = this.context
      let stateProps = mapStateToProps(store.getState())
      let dispatchProps = mapDispatchToProps(store.dispatch)
      return <WrappedComponent {...stateProps, ...dispatchProps} />
    }
  } 
}