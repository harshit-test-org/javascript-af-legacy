import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Spinner from './Spinner'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const Loader = () => (
  <Background>
    <Head>
      <title>Loading...</title>
    </Head>
    <Spinner className="la-3x" />
  </Background>
)

export default Loader
