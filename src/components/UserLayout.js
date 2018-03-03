import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Navbar from './styles/Navbar'
import Sidemenu from './Sidemenu'

import styled from 'styled-components'

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 72px 1fr;
  grid-template-areas:
    'sidebar navbar'
    'sidebar content';
  height: 100vh;
  overflow: hidden;
`

const Content = styled.div`
  grid-area: content;
  padding: 1rem;
  overflow: auto;
`

export default class Layout extends Component {
  render () {
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
    return (
      <LayoutGrid>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Sidemenu />
        <Navbar title="Discover" />
        <Content>{this.props.children}</Content>
      </LayoutGrid>
    )
  }
}
