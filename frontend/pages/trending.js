import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
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
      <UserLayout title="Trending">
        <Card>
          <h2>This is currently not avaliable in beta as we has less data to analyze for trending. Apologies 😅</h2>
          <h4>
            Till then why dont you checkout out{' '}
            <Link href="/editors-choice">
              <a>Editors Choice</a>
            </Link>
          </h4>
        </Card>
      </UserLayout>
    )
  }
}

export default withData(withAuth(Trending))
