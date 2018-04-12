// import React, { Component } from 'react'
// import Layout from '../components/DefaultLayout'
// import styled, { ThemeProvider } from 'styled-components'
// import withData from '../apollo/wihData'
// import theme from '../lib/theme'
// import getConfig from 'next/config'

// const Welcome = styled.div`
// grid-column:1/5;
// grid-row:1/2;
//   background-image: ${props =>
//     'linear-gradient(141deg,' +
//     theme.primary +
//     ',' +
//     theme.secondary +
//     ' 71%,' +
//     theme.primaryDark +
//     ')'};
//   height: 100vh;
//   clip-path: polygon(0 0, 100% 0, 100% 70%, 0 90%);
//   z-index:5;
//   &:before {
//     grid-column:1/5;
//     grid-row:1/2;
//     background-image: url('/static/loginimg.jpg');
//     background-size: cover;
//     height: 100%;
//     width: 100%;
//     display: block;
//     z-index: 0;
//     content: '';
//     opacity: 0.2;
//     pointer-events: none;
//   }
//     }
// `
// const Button = styled.div`
//   display: inline-block;
//   outline: none;
//   background-color: ${props => props.theme.primaryDark};
//   color: #fff;
//   font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
//   font-weight: 600;
//   font-size: 18px;
//   padding: 0.8rem;
//   border-radius: 50px;
//   cursor: pointer;
// `
// const Left = styled.div`
//   grid-column: 2/3;
//   grid-row: 1/2;
//   z-index: 50;
//   color: #fff;
//   h1 {
//     margin-bottom: 1rem;
//     line-height: 1.5;
//     letter-spacing: 0.25rem;
//   }
//   p {
//     margin-bottom: 2rem;
//     font-size: 1.25rem;
//   }
// `
// const Right = styled.div`
//   grid-column: 3/4;
//   grid-row: 1/2;
//   background: rebeccapurple;
//   height: 60%;
//   z-index: 50;
//   margin-top: 20rem;
// `
// const Wrapper = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 1fr 2fr 2fr 1fr;
//   grid-template-rows: 1fr;
// `
// const { publicRuntimeConfig: { BACKEND } } = getConfig()

// class Index extends Component {
//   handleLogin = async () => {
//     window.location.href = `${BACKEND}/auth/github/start`
//   }
//   render () {
//     return (
//       <ThemeProvider theme={theme}>
//         <Layout>
//           <Wrapper>
//             <Left>
//               <h1>JavaScript...always fun</h1>
//               <p>
//                 Showcasing unique and interesting JavaScript projects. Login
//                 with GitHub to add or browse repositories.
//               </p>
//               <Button onClick={this.handleLogin}>Login with Github</Button>
//             </Left>
//             <Right>put an image with a transparent background here</Right>
//             <Welcome />
//           </Wrapper>
//         </Layout>
//       </ThemeProvider>
//     )
//   }
// }

// export default withData(Index)

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

const Welcome = styled.div`
grid-column:1/5;
grid-row:1/4;
  background-image: ${props =>
    'linear-gradient(141deg,' +
    theme.primary +
    ',' +
    theme.secondary +
    ' 71%,' +
    theme.primaryDark +
    ')'};
  height: 100vh;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 0 90%);
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
const Button = styled.div`
  display: inline-block;
  outline: none;
  background-color: ${props => props.theme.primaryDark};
  color: #fff;
  font-family: 'Quicksand', Segoe UI, Tahoma, Geneva, sans-serif;
  font-weight: 600;
  font-size: 18px;
  padding: 0.8rem;
  border-radius: 50px;
  cursor: pointer;
`
const Left = styled.div`
  grid-column: 2/3;
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
`
const Right = styled.div`
  grid-column: 3/4;
  grid-row: 2/3;
  align-self: end;
  background: url('/static/landing_image.png') no-repeat;
  background-size: 100% auto;
  background-position: center;
  border-radius: 0.5rem;
  z-index: 50;
  height: 60%;
`
const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: 5rem 1fr 5rem;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 1/5;
  grid-row: 1/2;
  z-index: 30;
  height: 100%;
  margin: 3rem;
  a {
    color: #fff;
    font-size: 45px;
    text-decoration: none;
  }
  a:hover {
    color: ${props => props.theme.secondary};
    transition: 0.5s;
  }
`

const HeaderButton = Button.extend``

const Footer = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  z-index: 30;
  height: auto;
  & a {
    color: #fff;
    display: inline-block;
    margin: 0 1vw;
    font-size: 18px;
    text-decoration: none;
  }
  & a:hover {
    color: ${props => props.theme.secondary};
    transition: 0.2s;
  }
`

const { publicRuntimeConfig: { BACKEND } } = getConfig()

class Index extends Component {
  state = {
    loading: true
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

  handleLogin = async () => {
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
              <Top>
                {' '}
                <a href="/">
                  {'{'}JS.af{'}'}
                </a>
                <HeaderButton onClick={this.handleLogin}>
                  Login with Github
                </HeaderButton>
              </Top>
              <Left>
                <h1>JavaScript...always fun</h1>
                <p>
                  Showcasing unique and interesting JavaScript projects. Login
                  with GitHub to add or browse repositories.
                </p>
                <Button onClick={this.handleLogin}>Let me in</Button>
              </Left>
              <Right />
              <Welcome />
              <Footer>
                {links.map(item => (
                  <a href={item.href} key={`footer-link-${item.name}`}>
                    {item.name}
                  </a>
                ))}
              </Footer>
            </Wrapper>
          )}
        </ThemeProvider>
      </Fragment>
    )
  }
}

injectGlobal`
* {
    margin: 0;
    box-sizing:border-box;
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
