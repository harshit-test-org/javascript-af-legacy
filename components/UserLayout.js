import React, { Component } from 'react'
import Head from 'next/head'
import Navbar from './styles/Navbar'
import Sidemenu from './Sidemenu'
import theme from '../lib/theme'

import styled, { injectGlobal, ThemeProvider } from 'styled-components'

injectGlobal`
* {
    margin: 0;
}
html, body {
    background: #e6ecf0;
    font-family: 'Roboto', sans-serif;
}
h1, h2, h3, h4, h5, h6{
  font-family: 'Quicksand', Segoe UI, Tahoma,Verdana, sans-serif;
}
.chat{
    overflow: auto;
    grid-row: 1 / 2;
    display: flex;
    grid-column: 2 / 3;
    flex-direction: column;
}
.chat--closed{
    overflow: auto;
    grid-row: 1 / 2;
    display: flex;
    grid-column: 2 / 3;
    flex-direction: column;
}
@media all and (max-width: 550px){
.chat{
grid-column: 1 / 3;
}
.chat--closed{
   display: none;
}
}
`
const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 72px 1fr;
  grid-template-areas:
    'sidebar navbar'
    'sidebar content';
  height: 100vh;
  overflow: hidden;
  @media all and (max-width: 570px) {
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: 'navbar' 'content' 'sidebar';
  }
`

const Content = styled.div`
  grid-area: content;
  padding: 1rem;
  overflow: auto;
  @media all and (max-width: 500px) {
    margin-bottom: 73px;
  }
`

class Layout extends Component {
  state = {
    isSnackBarOpen: true
  }
  render () {
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
    return (
      <ThemeProvider theme={theme}>
        <LayoutGrid>
          <Head>
            <title>{title}</title>
          </Head>
          <Sidemenu />
          <Navbar title={this.props.title} />
          <Content>{this.props.children}</Content>
        </LayoutGrid>
      </ThemeProvider>
    )
  }
}

export default Layout
