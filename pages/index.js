import React, { Component, Fragment } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import withData from '../apollo/wihData'
import theme from '../lib/theme'
import getConfig from 'next/config'
import { graphql } from 'react-apollo'
import Head from 'next/head'
import Loading from '../components/Loading'
import Router from 'next/router'
import gql from 'graphql-tag'
import GitHubIcon from '../assets/icons/github'
import Spinner from '../components/Spinner'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  align-items: center;
  grid-template-rows: 5rem 1fr 5rem;
  grid-template-columns: 2rem 2fr 2fr 2rem;
  filter: drop-shadow(2px 1px 20px rgba(0, 0, 0, 0.5));
  @media (min-width: 700px) {
    grid-template-columns: 1fr 2fr 2fr 1fr;
  }
`

const Hero = styled.div`
grid-column:1/5;
grid-row:1/3;
  background-image: ${props =>
    'linear-gradient(141deg,' +
    theme.primary +
    ',' +
    theme.secondary +
    ' 71%,' +
    theme.primaryDark +
    ')'};
height:100%;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
  z-index:5;
  &:before {
    grid-column:1/5;
    grid-row:1/4;
    background-image: url('/static/loginimg.jpg');
    background-size: cover;
    height: 100%;
    width: 100%;
    display: block;
    z-index: 0;
    content: '';
    opacity: 0.2;
    pointer-events: none;
  }
    }
`

const Top = styled.div`
  display: contents;
  justify-content: space-between;
  align-items: center;
  z-index: 30;
  height: 100%;
  margin: 0;
  grid-column: 2/4;
  grid-row: 1/2;
  @media (min-width: 700px) {
    margin: 0 1rem;
    grid-column: 1/5;
    grid-row: 1/2;
  }
`

const Left = styled.div`
  grid-column: 2/4;
  grid-row: 1/4;
  z-index: 50;
  color: #fff;
  h1 {
    margin-bottom: 1rem;
    line-height: 1.5;
    letter-spacing: 0.25rem;
  }
  p {
    margin-bottom: 2rem;
    font-size: 1.25rem;
  }
  @media (min-width: 700px) {
    grid-column: 2/3;
    grid-row: 1/4;
  }
`

const Right = styled.div`
  grid-column: 3/4;
  grid-row: 2/3;
  align-self: end;
  z-index: 50;
  display: none;
  img {
    max-width: 100%;
    border-radius: 0.5rem;
  }
  @media (min-width: 700px) {
    display: block;
  }
`

const Button = styled.div`
  display: inline-block;
  outline: none;
  background-color: ${props => props.theme.primaryDark};
  color: #fff;
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
    grid-column: 1/2;
    grid-row: 1/2;
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
`

const Links = styled.div`
  display: none;
  @media (min-width: 700px) {
    display: block;
    grid-column: 2/4;
    grid-row: 1/2;
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
    grid-column: 2/5;
    grid-row: 1/2;
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

const { publicRuntimeConfig: { BACKEND } } = getConfig()

class Index extends Component {
  state = {
    loading: true,
    loggingIn: false
  }

  componentDidMount () {
    fetch(`${BACKEND}/me`, {
      credentials: 'include'
    }).then(res => {
      if (res.status !== 200) {
        this.setState({
          loading: false
        })
      } else {
        res
          .json()
          .then(res => {
            this.props
              .mutate({
                variables: {
                  user: {
                    ...res,
                    __typename: 'LocalUser'
                  }
                }
              })
              .then(() => {
                Router.replace('/home')
              })
          })
          .catch(() => {
            this.setState({
              loading: false
            })
          })
      }
    })
  }

  handleLogin = () => {
    this.setState({ loggingIn: true })
    window.location.href = `${BACKEND}/auth/github/start`
  }

  render () {
    const title = this.props.title
      ? `${this.props.title} | Javascript.af`
      : 'Javascript.af'
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
      <Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        <ThemeProvider theme={theme}>
          {this.state.loading ? (
            <Loading />
          ) : (
            <Wrapper>
              <Hero />
              <Top>
                <Brand>
                  <a href="/">
                    {'{'}JS.af{'}'}
                  </a>
                </Brand>
                <HeaderButton onClick={this.handleLogin}>
                  <span>Login with Github</span>
                  {this.state.loggingIn ? (
                    <Spinner
                      style={{
                        color: '#f1f1f1',
                        height: 'auto',
                        width: '1.8rem'
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fill: '#f1f1f1',
                        height: 'auto',
                        width: '1.8rem'
                      }}
                    >
                      <GitHubIcon />
                    </span>
                  )}
                </HeaderButton>
              </Top>
              <Left>
                <h1>JavaScript... always fun</h1>
                <p>
                  Showcasing unique and interesting JavaScript projects. Login
                  with GitHub to add or browse repositories.
                </p>
                <Button onClick={this.handleLogin}>Sign in</Button>
              </Left>
              <Right>
                <img
                  src="./static/landing_image.png"
                  alt="JavaScript... always fun"
                />
              </Right>
              <Links>
                {links.map(item => (
                  <a href={item.href} key={`footer-link-${item.name}`}>
                    {item.name}
                  </a>
                ))}
              </Links>
            </Wrapper>
          )}
        </ThemeProvider>
      </Fragment>
    )
  }
}

injectGlobal`
html {
  box-sizing:border-box
}
* {
    margin: 0;
    box-sizing:inherit;
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

const setUserMutation = gql`
  mutation setUser($user: User!) {
    setUser(user: $user) @client
  }
`

export default withData(graphql(setUserMutation)(Index))
