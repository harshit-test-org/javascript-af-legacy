import React, { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Modal from '../../components/Modal'
import FabButton from '../../components/FabButton'
import Container from '../../components/styles/Container'
import gql from 'graphql-tag'

const Feed = styled.div`
  height: auto;
  text-align: center;
  position: relative;
  top: 20px;
  & ul {
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    color: #000;
    height: auto;
    width: 40%;
    margin: 10px;
    padding: 10px 0 0 0;
    position: relative;
    left: 29%;
  }
  & ul > img {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    margin-bottom: 10px;
  }
  & p {
    color: #000;
    margin-bottom: 10px;
    font-size: 18px;
  }
  & .delete-post {
    cursor: pointer;
    color: #aaa;
    font-size: 35px;
    font-weight: 100;
    position: absolute;
    top: -5px;
    right: 5px;
  }
  & .delete-post:hover {
    color: #fd267d;
    transition: 0.5s;
  }
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    & ul {
      width: auto !important;
      position: relative;
      left: 0 !important;
    }
  }
  @media (max-width: 991px) {
    & ul {
      width: 55%;
      position: relative;
      left: 24%;
    }
  }
  @media (height: 1024px) {
    & ul {
      width: 70% !important;
      position: relative;
      left: 14% !important;
    }
  }
  @media (width: 1366px) {
    & ul {
      width: 50% !important;
      position: relative;
      left: 25% !important;
    }
  }
`

const CommentBar = styled.div`
  background: #eee;
  height: auto;
  padding: 10px;
  text-align: center;
  & a {
    display: inline-block;
    margin: 0 2vw auto;
    text-decoration: none;
  }
  & a:hover {
    color: #fd267d;
    transition: 0.5s;
  }
`

const PostArea = styled.textarea`
  outline: none;
  resize: none;
  border: none;
  border-bottom: 3px solid #fd267d;
  height: 207px;
  width: 98%;
  font-size: 1rem;
  margin-bottom: 10px;
  text-indent: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const PostButton = styled.button`
  outline: none;
  cursor: pointer;
  display: inline-block;
  border: none;
  border-radius: 6px;
  background: #fd267d;
  color: #fff;
  font-size: 20px;
  width: 40%;
  padding: 10px;
`

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

// Note might use formik for form handling....

class FeedPage extends Component {
  state = {
    modelOpen: false,
    postText: ''
  }
  toggleModal = () => {
    this.setState(state => ({
      modelOpen: !state.modelOpen
    }))
  }
  handleTextArea = e => {
    this.setState({
      postText: e.target.value
    })
  }
  submitPost = e => {
    // TODO: handle errors
    e.preventDefault()
    const { postText } = this.state
    if (postText) {
      // TODO: Add mutation for this
    }
  }
  render () {
    return (
      <Container>
        <Query query={query}>
          {({ data, error, loading }) => {
            if (loading) {
              return <h1>Loading...</h1>
            }
            if (error) {
              return <h1>Aw, Snap something bad happened</h1>
            }
            if (data) {
              console.log(data)
              return data.getFeed.map(item => (
                <Feed key={item._id}>
                  <ul>
                    <span className="delete-post">&times;</span>
                    <img
                      src={item.author.photoURL}
                      alt={`${item.author.name}'s profile`}
                    />
                    <p>{item.text}</p>
                    <CommentBar>
                      <a href="like">Like</a>
                      <a href="comment">Comment</a>
                    </CommentBar>
                  </ul>
                </Feed>
              ))
            }
          }}
        </Query>
        <FabButton onClick={this.toggleModal} />
        <Modal show={this.state.modelOpen} toggle={this.toggleModal}>
          <form onSubmit={this.submitPost}>
            <PostArea
              onChange={this.handleTextArea}
              placeholder="What is on your mind!"
            />
            <PostButton type="submit">Post!</PostButton>
          </form>
        </Modal>
      </Container>
    )
  }
}

export default FeedPage
