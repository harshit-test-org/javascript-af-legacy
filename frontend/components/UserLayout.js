import React, { Component } from 'react'
import Head from 'next/head'
import Navbar from './styles/Navbar'
import Sidemenu from './Sidemenu'
import theme from '../lib/theme'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import NProgress from 'nprogress'
import Router from 'next/router'
import { pageView } from '../lib/track'
import FabButton from '../components/FabButton'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = url => {
  pageView(url)
  NProgress.done()
}
Router.onRouteChangeError = () => NProgress.done()

injectGlobal`
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

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
.ais-InstantSearch__root{

 background: rgb(240, 240, 240);
  transition: all 0.3s ease;
  border-radius: 30px;
  grid-column: 2 / 3;
  padding: 0.5rem; 
  margin-right: 1rem;
  display: inline-flex;
  width: 100%;
}
  .ais-InstantSearch__root:focus-within {
    border-radius: 0;
  }
  @media all and (max-width: 990px) {
    .ais-InstantSearch__root{
    display: none;
    }
  }
 
  .ais-InstantSearch__root svg {
    width: 26px;
    height: 26px;
    fill: rgba(0, 0, 0, 0.67);
  }
  .ais-InstantSearch__root > div{
    width: 100%;
    position: relative;
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
  static defaultProps = {
    loading: false
  }
  render() {
    const title = this.props.title ? `${this.props.title} | Javascript.af` : 'Javascript.af'
    return (
      <ThemeProvider theme={theme}>
        <>
          <Head>
            <title>{title}</title>
          </Head>
          <Sidemenu />
          <Navbar title={this.props.title} loading={this.props.loading} />
          {!this.props.noFab && (
            <FabButton
              onClick={() => {
                Router.push('/publish/post')
              }}
            />
          )}

          <Content>{this.props.children}</Content>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout
