import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  bottom: 0%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  opacity: ${props => (props.show ? '1' : '0')};
  position: fixed;
  transition: all 0.4s ease-in-out;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(100%)')};
  width: 100vw;
  z-index: 1000;
`

const Toast = styled.div`
  background-color: #323232;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  max-width: 568px;
  min-width: 288px;
  line-height: 1.5;
  padding: 12px 24px;
`

const Message = styled.p`
  color: #f1f1f1;
`

const Action = styled.a`
  color: #a28aff;
  cursor: pointer;
  margin-left: 24px;
  text-transform: uppercase;
`

class SnackBar extends Component {
  state = {
    show: false
  }

  componentDidMount () {
    this.setState({ show: true }, () => {
      if (this.props.actionText) return
      setTimeout(() => {
        this.setState({ show: false })
      }, this.props.timeout || 2750)
    })
  }

  clickHandler = () => {
    this.props.actionClick && this.props.actionClick()
    this.setState({ show: false })
  }

  render () {
    const { message, actionText } = this.props
    const { show } = this.state
    return (
      <Container show={show}>
        <Toast>
          <Message>{message}</Message>
          {actionText && (
            <Action onClick={this.clickHandler}>{actionText}</Action>
          )}
        </Toast>
      </Container>
    )
  }
}

export default SnackBar
