import React, { Component } from 'react'
import Router from 'next/router'
import gql from 'graphql-tag'
import FabButton from '../components/FabButton'
import RepoMasonry from './RepoMasonry'

import Layout from '../components/UserLayout'

const ReposQuery = gql`
  query getRepos($page: Int) {
    getRepos(page: $page) {
      _id
      posted
      name
      description
      url
      owner {
        _id
        name
        photoURL
      }
    }
  }
`

class Index extends Component {
  componentDidMount() {
    Router.prefetch('/publish/post')
  }

  render() {
    return (
      <Layout title="Discover">
        <FabButton
          onClick={() => {
            Router.push('/publish/post')
          }}
        />
        <RepoMasonry query={ReposQuery} gKey="getRepos" />
      </Layout>
    )
  }
}

export default Index
