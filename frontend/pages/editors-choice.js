import React, { Component } from 'react'
import gql from 'graphql-tag'
import RepoMasonry from '../components/RepoMasonry'
import UserLayout from '../components/UserLayout'
import withAuth from '../components/withAuth'

const ReposQuery = gql`
  query getEditorsChoiceRepos($page: Int) {
    getEditorsChoiceRepos(page: $page) {
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

class EditorsChoice extends Component {
  render() {
    return (
      <UserLayout title="Editors Choice">
        <RepoMasonry query={ReposQuery} gKey="getEditorsChoiceRepos" />
      </UserLayout>
    )
  }
}

export default withAuth(EditorsChoice)
