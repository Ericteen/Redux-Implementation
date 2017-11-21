import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * 
 * 
 * @export
 * @class Provider
 * @extends {Component}
 */
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any,
  }

  static childContextTypes = {
    store: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
  }


  getChildContext() {
    return {
      store: this.props.store
    }
  }
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Provider
