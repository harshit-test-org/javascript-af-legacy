import React from 'react'
import Head from 'next/head'
import styled, { keyframes } from 'styled-components'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

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
  top: 45%;
  z-index: 5;
  clip: rect(0px 66px 66px 0px);
  animation: ${rotate} 1.5s linear infinite 0s;
`

const Loader = () => (
  <Background>
    <Head>
      <title>Loading...</title>
    </Head>
    <Arc />
  </Background>
)

export default Loader
