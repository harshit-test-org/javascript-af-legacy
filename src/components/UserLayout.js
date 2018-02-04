import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import Navbar from './styles/Navbar'
import Sidemenu from './Sidemenu'

export default class Layout extends Component {
  render () {
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {this.props.links && <Navbar links={this.props.links} />}
        <Sidemenu />
        {this.props.children}
      </Fragment>
    )
  }
}
