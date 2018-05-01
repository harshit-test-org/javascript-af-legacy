import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../lib/theme'
import getConfig from 'next/config'
import Head from 'next/head'
import GitHubIcon from '../assets/icons/github'
import Spinner from '../components/Spinner'

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  background: rgb(46, 125, 50);
  background: radial-gradient(circle, rgba(46, 125, 50, 1) 0%, rgba(31, 106, 35, 1) 44%, rgba(10, 89, 14, 1) 100%);
  grid-template-rows: 5rem 1fr;
`

const Top = styled.div`
  grid-row: 1/2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Middle = styled.div`
  z-index: 50;
  color: #fff;
  grid-row: 2 / 3;
  padding: 0 8rem;
  align-self: center;
  h1 {
    margin-bottom: 1rem;
    line-height: 1.5;
    letter-spacing: 0.15rem;
  }
  p {
    margin-bottom: 2rem;
    font-size: 1.25rem;
    width: 70%;
  }
  @media (max-width: 770px) {
    p {
      width: 100%;
    }
    padding: 0 1.5rem;
  }
`

const Button = styled.div`
  display: inline-block;
  outline: none;
  background-color: #fff;
  color: ${props => props.theme.primary};
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 0.8rem 1rem;
  border-radius: 50px;
  cursor: pointer;
`

const Brand = styled.div`
  display: contents;
  a {
    margin: 0 16px;

    z-index: 50;
    color: #fff;
    font-size: 2em;
    text-decoration: none;
    letter-spacing: 3px;
  }
  a:hover {
    color: ${props => props.theme.secondary};
    transition: 0.5s;
  }
  a > img {
    width: 60px;
  }
`

const Links = styled.div`
  display: none;
  @media (min-width: 770px) {
    display: block;

    z-index: 30;
    height: auto;
    & a {
      color: #fff;
      display: inline-block;
      margin-right: 1rem;
      font-size: 18px;
      text-decoration: none;
    }
    & a:hover {
      color: ${props => props.theme.secondary};
      transition: 0.2s;
    }
  }
`

const HeaderButton = Button.extend`
  display: none;
  @media (min-width: 400px) {
    z-index: 50;
    justify-self: end;
    margin: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    justify-items: flex-end;
    padding: 0.4rem 0.8rem;
    & > span {
      display: 'inline-block';
      padding-right: 8px;
    }
  }
`
const SvgContainer = styled.div`
  position: relative;
  top: 5px;
  svg {
    fill: #fff;
  }
`

const {
  publicRuntimeConfig: { BACKEND }
} = getConfig()

class Index extends Component {
  state = {
    loggingIn: false
  }

  handleLogin = () => {
    this.setState({ loggingIn: true })
    window.location.href = `${BACKEND}/auth/github/start`
  }

  render() {
    const title = this.props.title ? `${this.props.title} | Javascript.af` : 'Javascript.af'
    const links = [
      {
        name: 'About',
        href: '/about'
      },
      {
        name: 'Team',
        href: '/team'
      },
      {
        name: 'Terms',
        href: '/terms'
      },
      {
        name: 'Privacy Policy',
        href: '/privacy'
      }
    ]
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Wrapper>
            <Top>
              <Brand>
                <a href="/">
                  <img src="/static/logo.png" alt="" />
                </a>
              </Brand>
              <Links>
                {links.map(item => (
                  <a href={item.href} key={`footer-link-${item.name}`}>
                    {item.name}
                  </a>
                ))}
              </Links>
              <HeaderButton onClick={this.handleLogin}>
                <span>Login with Github</span>
                {this.state.loggingIn ? (
                  <Spinner
                    style={{
                      color: 'rgba(46, 125, 50, 1)',
                      height: 'auto',
                      width: '1.8rem'
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fill: 'rgba(46, 125, 50, 1)',
                      height: 'auto',
                      width: '1.8rem'
                    }}
                  >
                    <GitHubIcon />
                  </span>
                )}
              </HeaderButton>
            </Top>
            <Middle>
              <h1>JavaScript... always fun</h1>
              <p>
                Showcasing unique and interesting JavaScript projects. Login with GitHub to add or browse repositories.
              </p>
              <Button onClick={this.handleLogin}>Sign in</Button>
            </Middle>

            <SvgContainer>
              <svg
                className="goop__InlineSvg-s1g583nk-0 foDkDe"
                fillRule="evenodd"
                clipRule="evenodd"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="title"
                viewBox="0 0 1920 240"
                id="goop"
              >
                <title id="title">goop</title>
                <g>
                  <path d="M1920,144.5l0,95.5l-1920,0l0,-65.5c196,-36 452.146,-15.726 657.5,8.5c229.698,27.098 870,57 1262.5,-38.5Z" />
                </g>
              </svg>
            </SvgContainer>
          </Wrapper>
        </ThemeProvider>
      </>
    )
  }
}

export default Index
