import React, { Component } from 'react'
import styled from 'styled-components'

// .Modal {
//   position: fixed;
//   z-index: 500;
//   background-color: white;
//   width: 70%;
//   border: 1px solid #ccc;
//   box-shadow: 1px 1px 1px black;
//   padding: 16px;
//   left: 15%;
//   top: 30%;
//   box-sizing: border-box;
//   transition: all 0.4s ease-out;
// }

const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  position: fixed;
  bottom: 0%;
  z-index: 1000;
  box-sizing: border-box;
  transition: all 5.4s ease-out;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(100vh)')};
  opacity: ${props => (props.show ? '1' : '0')};
`

const Toast = styled.div`
  display: flex;
  justify-content: space-between;
  /* position: absolute;
  bottom: 0;
  z-index: 1000; */
  background-color: #323232;
  border-radius: 2px;
  padding: 12px 24px;
  line-height: 1.5;
  min-width: 288px;
  max-width: 568px;
`

const Text = styled.p`
  color: #f1f1f1;
`

const Action = styled.a`
  color: #a28aff;
  cursor: pointer;
`

// const CardThumb = styled.div`
//   height: auto;
//   clip-path: polygon(0px 0px, 100% 0px, 98.8889% 84.6667%, 0% 100%);
//   & img {
//     display: block;
//     width: 100%;
//     height: auto;
//   }
// `

// const CardContent = styled.div`
//   background: white;
//   padding: 16px;
//   h2 {
//     margin: 0;
//     padding: 0 0 10px;
//     font-size: 26px;
//     word-wrap: break-word;
//     font-weight: 700;
//   }
//   p {
//     margin: 0;
//     color: ${props => props.theme.secondary};
//     padding: 0 0 20px;
//     font-size: 18px;
//     font-weight: 400;
//   }
// `

class SnackBar extends Component {
  render () {
    console.log('render props:', this.props)
    return (
      <Container show={this.props.show}>
        <Toast>
          <Text>Test</Text>
          <Action onClick={this.props.actionClick}>RETRY</Action>
        </Toast>
      </Container>
    )
  }
}

export default SnackBar
