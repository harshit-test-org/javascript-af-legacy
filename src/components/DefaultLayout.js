import React, { Component } from 'react'
import Homebar from './styles/Homebar'

const Fragment = React.Fragment

export default class Layout extends Component {
  render () {
    return (
      <Fragment>
        <Homebar />
        {this.props.children}
      </Fragment>
    )
  }
}
