import React, { Component } from 'react'
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

const LoadTrigger = styled.p`
  color: #ff0000;
  margin: 90px;
  text-align: center;
`

class Layout extends Component {
  state = {
    prevY: 0
  }

  componentDidMount () {
    console.log(this.loadTrigger)
    // Set up intersection observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    this.observer = new IntersectionObserver(this.handleObserver, options)
    this.observer.observe(this.loadTrigger)
  }

  handleObserver = (entities, observer) => {
    console.log('handleObserver-entities:', entities)
    console.log('handleObserver-observer:', observer)
    // only run code in if-block when scrolling down, not up
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      console.log('observer callback run')
    }
    this.setState({ prevY: y })
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
          <Content>
            {/* <div style={{ marginBottom: '1000px' }}>blaaaaaaaaaaaaaaa</div> */}
            {this.props.children}
            <LoadTrigger
              innerRef={el => {
                this.loadTrigger = el
              }}
            >
              Replace with spinner that is not centered vertically
            </LoadTrigger>
          </Content>
        </LayoutGrid>
      </ThemeProvider>
    )
  }
}

export default Layout
