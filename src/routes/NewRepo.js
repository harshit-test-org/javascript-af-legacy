import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/UserLayout'

const Container = styled.div`
  background: #ffffff;
  padding: 1.2rem;
  min-height: 100%;
`

export default class NewRepo extends Component {
  render () {
    return (
      <Layout title="New Repository">
        <Container>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </Container>
      </Layout>
    )
  }
}
