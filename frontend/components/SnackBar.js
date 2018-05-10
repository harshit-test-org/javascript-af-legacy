import React, { Component } from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 13%;
  align-items: flex-end;
  right: 2%;
  width: 100vw;
  z-index: 1000;
  flex-direction: column;
`

const Toast = styled.div`
  background-color: #323232;
  margin-bottom: 10px;
  transition: all 0.4s ease-in-out;
  border-radius: 2px;
  display: ${props => (props.show ? 'flex' : 'none')};
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

  componentDidMount() {
    this.setState({ show: true }, () => {
      if (this.props.actionText) return
      setTimeout(() => {
        this.setState({ show: false })
      }, this.props.timeout || 4000)
    })
  }

  clickHandler = () => {
    this.props.actionClick && this.props.actionClick()
    this.setState({ show: false })
  }

  render() {
    const { message, actionText } = this.props
    const { show } = this.state
    return (
      <Toast show={show}>
        <Message>{message}</Message>
        {actionText && <Action onClick={this.clickHandler}>{actionText}</Action>}
      </Toast>
    )
  }
}

export default SnackBar
