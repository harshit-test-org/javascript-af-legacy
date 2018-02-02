import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Navbar from './styles/Navbar'
import Sidemenu from './Sidemenu'

const Fragment = React.Fragment

export default class Layout extends Component {
  renderLinks (links) {
    return (
      <Fragment>
        {links.map((item, i) => (
          <Fragment key={`links-${i}`}>
            <a href={item.href}>{item.name}</a>
            {i !== links.length - 1 && '•'}
          </Fragment>
        ))}
      </Fragment>
    )
  }
  render () {
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Navbar>{this.renderLinks(this.props.links)}</Navbar>
        <Sidemenu />
        {this.props.children}
      </Fragment>
    )
  }
}
