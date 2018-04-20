import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import Layout from '../components/UserLayout'
import GitIcon from '../assets/icons/github'
import { LinkBtn } from '../components/Button'
import styled from 'styled-components'
import gql from 'graphql-tag'
import withData from '../apollo/wihData'
import withAuth from '../components/withAuth'
import MailIcon from '../assets/icons/envelope'
import UserIcon from '../assets/icons/account'

const query = gql`
  query profileQuery($id: ID!) {
    getUserById(id: $id) {
      # username #not using until this works for every user
      name
      photoURL
      bio
    }
  }
`

const Card = styled.div`
  padding: 1rem;
  background: #fff;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 85% 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'heading heading'
    'repos extras';
  @media all and (max-width: 1024px) {
    grid-template-columns: 65% 1fr;
  }
  @media all and (max-width: 790px) {
    display: flex;
    flex-direction: column;
  }
`

const Description = styled.p`
  color: ${props => props.theme.secondary};
  font-size: 24px;
  font-family: Roboto;
  grid-area: heading;
`

const ExtrasArea = styled.div`
  grid-area: extras;
  padding: 1.5rem 0.7rem 0.7rem 0.7rem;
  border-left: 1px solid #cbcbcb;
  @media all and (max-width: 790px) {
    border-left: none;
    border-top: 1px solid #cbcbcb;
    padding: 0.7rem;
    margin-top: 0.7rem;
  }
`

const GitBtn = LinkBtn.extend`
  width: 100%;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  margin-top: 0.5rem;
`

const InfoContainer = styled.div`
  width: 100%;
  margin: 1rem 0rem;
  & > img {
    width: 100%;
    border-radius: 5px;
  }
  & > h3 {
    font-size: 1.75rem;
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
  }
  & > h4 {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    margin: 0.25rem 0;
    svg {
      fill: ${props => props.theme.primaryDark};
      width: 24px;
      height: auto;
      margin-right: 0.25rem;
    }
  }
  & > p {
    font-size: 1rem;
    margin: 0.25rem 0;
  }
`

class ProfilePage extends Component {
  static getInitialProps = ({ query }) => {
    return { query }
  }
  render() {
    return (
      <Fragment>
        <Query
          query={query}
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
              getUserById: { name, photoURL, bio }
            } = data
            return (
              <Layout title={`${name}'s profile`}>
                <Card>
                  <Description>List of featured repos and other information here</Description>

                  <ExtrasArea>
                    <InfoContainer>
                      <img src={photoURL} alt={`${name}'s profile picture`} />
                      <h3>{name}</h3>
                      <h4>
                        <UserIcon /> - Username here
                      </h4>
                      <h4>
                        <MailIcon /> - email here
                      </h4>
                      <p>{bio || 'No bio available'}</p>
                      <GitBtn href="https://www.google.com" target="_blank" rel="noopener">
                        <GitIcon
                          style={{
                            fill: '#fff',
                            height: 'auto',
                            width: '1.7rem'
                          }}
                        />&nbsp; Go to Github profile
                      </GitBtn>
                    </InfoContainer>
                  </ExtrasArea>
                </Card>
              </Layout>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default withData(withAuth(ProfilePage))
