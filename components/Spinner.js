import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from { 
    transform: rotate(0deg) 
  }
  to { 
    transform: rotate(360deg) 
  }
`

const Arc = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 60px;
  border: 7px solid ${props => props.theme.primaryDark};
  position: absolute;
  bottom: ${props => props.bottom || '55%'};
  z-index: 100;
  clip: rect(0px 66px 66px 0px);
  animation: ${rotate} 1.5s linear infinite 0s;
  display: ${props => (props.hidden ? 'none' : 'block')};
`

const Spinner = props => {
  return <Arc bottom={props.bottom} hidden={props.hidden} />
}

export default Spinner
