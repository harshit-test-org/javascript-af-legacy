import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Layout from '../components/UserLayout'
import GitIcon from '../assets/icons/github'
import { LinkBtn } from '../components/Button'
import styled from 'styled-components'
import gql from 'graphql-tag'
import withAuth from '../components/withAuth'
import UserIcon from '../assets/icons/account'
import RepoMasonry from '../components/RepoMasonry'

const profileQuery = gql`
  query profileQuery($id: ID!) {
    getUserById(id: $id) {
      name
      username
      githubURL
      photoURL
      bio
    }
  }
`

const userRepos = gql`
  query profileQuery($id: ID!, $page: Int) {
    getReposByUser(id: $id, page: $page) {
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

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  @media all and (max-width: 790px) {
    flex-direction: column;
  }
`

const UserContainer = styled.div`
  width: 100%;
  flex: 1;
  margin-right: 2rem;
  @media all and (max-width: 790px) {
    & > img {
      height: 360px;
      width: 360px !important;
    }
  }
  @media all and (max-width: 570px) {
    margin-bottom: 1rem;
    & > img {
      height: auto;
      width: 100% !important;
    }
  }
  .info {
    padding: 0.7rem;
  }
  & > img {
    width: 100%;
    border-radius: 5px;
  }
  & .info > h3 {
    font-size: 1.75rem;
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
  }
  & .info > h4 {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    margin: 0.25rem 0;
    svg {
      fill: ${props => props.theme.primaryDark};
      width: 24px;
      height: auto;
      margin-right: 0.5rem;
    }
  }
  & .info > p {
    font-size: 1rem;
    margin: 0.25rem 0;
  }
  background: #fff;
`
const GitBtn = LinkBtn.extend`
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  margin-top: 0.5rem;
`

const ContentContainer = styled.div`
  flex: 3;
  @media all and (max-width: 1024px) {
    flex: 2;
  }
`

class ProfilePage extends Component {
  static getInitialProps = ({ query }) => {
    return { query }
  }
  render() {
    return (
      <Query
        query={profileQuery}
        variables={{
          id: this.props.query.id
        }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <Layout title="Loading">Loading...</Layout>
          }
          if (error) {
            return <Layout title="Error">Error...</Layout>
          }
          const {
            getUserById: { name, username, githubURL, photoURL, bio }
          } = data
          return (
            <Layout title={`${name}'s profile`}>
              <Container>
                <UserContainer>
                  <img src={photoURL} alt={`${name}'s profile picture`} />
                  <div className="info">
                    <h3>{name}</h3>
                    <h4>
                      <UserIcon /> {username}
                    </h4>
                    <p>{bio || 'No bio available'}</p>
                    <GitBtn href={githubURL} target="_blank" rel="noopener">
                      <GitIcon
                        style={{
                          fill: '#fff',
                          height: 'auto',
                          width: '1.7rem'
                        }}
                      />&nbsp; Go to Github profile
                    </GitBtn>
                  </div>
                </UserContainer>
                <ContentContainer>
                  <RepoMasonry
                    grid={false}
                    query={userRepos}
                    gKey="getReposByUser"
                    vars={{
                      id: this.props.query.id
                    }}
                  />
                </ContentContainer>
              </Container>
            </Layout>
          )
        }}
      </Query>
    )
  }
}

export default withAuth(ProfilePage)
