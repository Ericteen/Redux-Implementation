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
