import React, { Component } from 'react'
import Layout from '../components/UserLayout'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Container = styled.div`
  background: #ffffff;
  padding: 1.2rem;
  min-height: 100%;
`
const RepoCard = styled.div`
  width: 100%;
  display: grid;
  padding: 0.5rem 0;
  grid-template-columns: 2fr 1fr;
  grid-gap: 6px;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'link select' 'desc select';
  border-bottom: 1px #b3b6ba solid;
  a {
    grid-area: link;
    font-family: 'Quicksand', Segoe UI, Tahoma, Verdana, sans-serif;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.5rem;
    color: ${props => props.theme.primaryDark};
  }
  p {
    grid-area: desc;
  }
`

const UserReposQuery = gql`
  {
    getUserGithubRepos {
      _id
      name
      nameWithOwner
      starCount
      description
    }
  }
`

class PostRepo extends Component {
  render () {
    return (
      <Layout title="Post a Repo">
        <Container>
          <h1>Your Repositories</h1>
          <Query query={UserReposQuery}>
            {({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>
              if (error) return null
              return data.getUserGithubRepos.map(repo => (
                <RepoCard key={repo._id}>
                  <a href="">{repo.nameWithOwner}</a>
                  <p>
                    {repo.description || (
                      <i>(No description provided on Github)</i>
                    )}
                  </p>
                </RepoCard>
              ))
            }}
          </Query>
        </Container>
      </Layout>
    )
  }
}

export default PostRepo
