import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import Layout from '../components/UserLayout'
import styled from 'styled-components'
import { compose, graphql, Query } from 'react-apollo'

const FeedContainer = styled.div`
  padding: 0 23%;
  @media all and (max-width: 570px) {
    padding: 0 0.3rem;
  }
`
const FeedCard = styled.div`
  width: 100%;
  background: #ffffff;
  margin-bottom: 40px;
`
const FeedAuthorInfo = styled.div`
  padding: 0.5rem;
  display: flex;
  & .time {
    flex: 1;
    display: flex;
    align-items: center;
    font-style: italic;
  }
`

const FeedAuthor = styled.div`
  flex: 7;
  display: flex;
  margin-bottom: 8px;
  & img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  & .name {
    display: flex;
    align-items: center;
    font-size: 24px;
    padding-left: 16px;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
  }
`

const FeedImage = styled.img`
  width: 100%;
  height: auto;
`

const FeedText = FeedAuthorInfo.extend`
  padding: 1rem;
`

const Like = styled.div`
  background: #eee;
  padding: 1rem;
  border-radius: 50%;
  margin-left: 3%;
`
const CommentBar = styled.div`
  flex: 1;
  margin-left: 5%;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  border: 0;
  width: 100%;
  height: 20px;
  outline: none;
`
const RoundInput = styled.div`
  border: 1px solid grey;
  width: 100%;
  border-radius: 50px;
  padding: 8px 15px;
`

// Data stuff m TODO: clean this file
const query = gql`
  query feed {
    getFeed {
      _id
      text
      authorId
      author {
        name
        photoURL
      }
    }
  }
`

const LocalUserQuery = gql`
  query LocalUser {
    user @client {
      _id
    }
  }
`

class Feed extends Component {
  render () {
    return (
      <Layout title="Feed">
        <FeedContainer>
          <Query query={query}>
            {({ data, error, loading }) => {
              if (loading) {
                return <h1>Loading...</h1>
              }
              if (error) {
                return <h1>Aw, Snap something bad happened</h1>
              }
              if (data) {
                const { getFeed: feed } = data
                return (
                  <Fragment>
                    {feed.map(item => (
                      <FeedCard key={item._id}>
                        <FeedAuthorInfo>
                          <FeedAuthor>
                            <img
                              src={item.author.photoURL}
                              alt={item.author.name}
                            />
                            <span className="name"> {item.author.name}</span>
                          </FeedAuthor>
                          {/* <div className="time">1h ago</div> */}
                        </FeedAuthorInfo>
                        <FeedText>{item.text}</FeedText>
                        {feed.image && <FeedImage src={feed.image} />}
                        <FeedAuthorInfo>
                          <Like>+1</Like>
                          <CommentBar>
                            <RoundInput>
                              <Input
                                type="text"
                                placeholder="Write a response"
                              />
                            </RoundInput>
                          </CommentBar>
                        </FeedAuthorInfo>
                      </FeedCard>
                    ))}
                  </Fragment>
                )
              }
            }}
          </Query>
        </FeedContainer>
      </Layout>
    )
  }
}

export default compose(graphql(LocalUserQuery))(Feed)
