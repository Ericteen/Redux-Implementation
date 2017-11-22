import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrappedComponent) => {
  return class ConnectComponent extends Component {
    static contexTypes = {
      store: PropTypes.object,
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
         props: {}
      }
    }

    componentDidMount() {
      const { store } = this.context
      store.subscribe(() => this.update())
      this.update()
    }

    update() {
      const { store } = this.context
      const stateProps = mapStateToProps(store.getstate())
      const dispatchProps = bindActionCreatores(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps,
        }
      })
    }
    
    render() {
      return <WrappedComponent { ...this.state.props } />
    }
  }
}