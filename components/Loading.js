import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Spinner from './Spinner'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Loader = () => (
  <Background>
    <Head>
      <title>Loading...</title>
    </Head>
    <Spinner />
  </Background>
)

export default Loader
