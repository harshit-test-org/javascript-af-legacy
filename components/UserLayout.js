import React, { Component, Fragment } from 'react'
import Head from 'next/head'
import Navbar from './styles/Navbar'
import Sidemenu from './Sidemenu'
import theme from '../lib/theme'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

injectGlobal`
/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #e74c3c;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 5px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #e74c3c, 0 0 5px #e74c3c;
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 22px;
  height: 22px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #e74c3c;
  border-left-color: #e74c3c;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

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
@media all and (max-width: 570px){
  body, html{
    font-size: 14px;
  }
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

const Content = styled.div`
  padding: 1rem;
  margin-top: 72px;
  margin-left: 80px;
  @media all and (max-width: 570px) {
    margin-left: auto;
  }
`

class Layout extends Component {
  render() {
    const title = this.props.title ? `${this.props.title} | Javascript.af` : 'Javascript.af'
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Head>
            <title>{title}</title>
          </Head>
          <Sidemenu />
          <Navbar title={this.props.title} />
          <Content>{this.props.children}</Content>
        </Fragment>
      </ThemeProvider>
    )
  }
}

export default Layout
