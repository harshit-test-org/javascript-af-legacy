import React, { Component } from 'react'
import Layout from '../components/DefaultLayout'
import styled, { ThemeProvider } from 'styled-components'
import withData from '../apollo/wihData'
import theme from '../lib/theme'

const Welcome = styled.div`
grid-column:1/5;
grid-row:1/2;
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
    grid-row:1/2;
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
  grid-row: 1/2;
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
  grid-row: 1/2;
  background: rebeccapurple;
  height: 60%;
  z-index: 50;
  margin-top: 20rem;
`
const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: 1fr;
`
// const Welcome = styled.div`
// display:grid;
// align-items: center;
// grid-template-columns: 1fr 2fr 2fr 1fr;
// grid-template-rows: 1fr;
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
//   &:before {
//     background-color: green;
//     z-index: 10;
//     background-image: url('/static/loginimg.jpg');
//     background-size: cover;
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 100%;
//     width: 100%;
//     display: block;
//     z-index: 0;
//     content: '';
//     opacity: 0.2;
//     pointer-events: none;
//   }
//     &>.left{
//       grid-column:2/3;
//       grid-row:1/2;
//       h1{
//         margin-bottom:1rem;
//       }
//       p{
//         margin-bottom:2rem;

//       }
//     }
// `
// const Button = styled.div`
// display:inline-block;
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
// const Right = styled.div`
// grid-column:3/4;
// grid-row:1/2;
// background: rebeccapurple;
// height:60%;
// z-index:2000;
// `

class Index extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Wrapper>
            <Left>
              <h1>JavaScript...always fun</h1>
              <p>
                Showcasing unique and interesting JavaScript projects. Login
                with GitHub to add or browse repositories.
              </p>
              <Button>Login with Github</Button>
            </Left>
            <Right>put an image with a transparent background here</Right>
            <Welcome />
          </Wrapper>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default withData(Index)
