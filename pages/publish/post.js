import React, { Component } from 'react'
import Router from 'next/router'
import Layout from '../../components/UserLayout'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Button from '../../components/Button'
import withData from '../../apollo/wihData'
import withAuth from '../../components/withAuth'

const Container = styled.div`
  background: #ffffff;
  padding: 1.2rem;
  min-height: 100%;
`
const RepoCard = styled.div`
  width: 100%;
  display: grid;
  padding: 0.5rem 0;
  grid-template-columns: 3fr 1fr;
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
  @media all and (max-width: 570px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: 'link' 'desc' 'select';
    a{
      font-size: 1.2rem;
      word-break: break-all;
    }
}
  }

`

const RepoCardActions = styled.div`
  grid-area: select;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 570px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`

const UserReposQuery = gql`
  query getUserGithubRepos($page: Int) {
    getUserGithubRepos(page: $page) {
      _id
      name
      url
      nameWithOwner
      starCount
      description
    }
  }
`

class PostRepo extends Component {
  state = {
    page: 2,
    loading: false,
    hasMore: true
  }
  handleNavigation = repo => {
    Router.push(
      {
        pathname: '/publish/new',
        query: {
          ...repo
        }
      },
      '/publish/new'
    )
  }
  render() {
    return (
      <Layout title="Post a Repo">
        <Query query={UserReposQuery}>
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <h4>Loading...</h4>
            if (error) return null
            return (
              <Container>
                <h1>Your Repositories</h1>
                {data.getUserGithubRepos.map(repo => (
                  <RepoCard key={repo._id}>
                    <a href={repo.url} target="_blank" rel="noopener">
                      {repo.nameWithOwner}
                    </a>
                    <p>{repo.description || <i>(No description provided on Github)</i>}</p>
                    <RepoCardActions>
                      <Button onClick={() => this.handleNavigation(repo)}>Select</Button>
                    </RepoCardActions>
                  </RepoCard>
                ))}
                <br />
                {this.state.hasMore && (
                  <Button
                    disabled={this.state.loading}
                    style={{
                      width: '14%'
                    }}
                    onClick={() => {
                      this.setState({ loading: true })
                      fetchMore({
                        variables: {
                          page: this.state.page
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev
                          if (fetchMoreResult.getUserGithubRepos.length === 0) {
                            this.setState({
                              hasMore: false
                            })
                            return prev
                          }
                          return Object.assign({}, prev, {
                            getUserGithubRepos: [...prev.getUserGithubRepos, ...fetchMoreResult.getUserGithubRepos]
                          })
                        }
                      }).then(() => {
                        this.setState(state => ({
                          page: state.page + 1,
                          loading: false
                        }))
                      })
                    }}
                  >
                    {this.state.loading ? 'Loading...' : 'Fetch More'}
                  </Button>
                )}
              </Container>
            )
          }}
        </Query>
      </Layout>
    )
  }
}

export default withData(withAuth(PostRepo))
