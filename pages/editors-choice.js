import React, { Component } from 'react'
import styled from 'styled-components'
import UserLayout from '../components/UserLayout'
import withData from '../apollo/wihData'
import withAuth from '../components/withAuth'

const Card = styled.div`
  padding: 1rem;
  background: #fff;
`

class Trending extends Component {
  render() {
    return (
      <UserLayout title="Editors Choice">
        <Card>
          <h1>WIP</h1>
        </Card>
      </UserLayout>
    )
  }
}

export default withData(withAuth(Trending))
