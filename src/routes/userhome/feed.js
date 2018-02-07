import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { firestore } from '../../lib/firebase'
import Container from '../../components/styles/Container'

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

class FeedPage extends Component {
  state = {
    feed: [],
    loading: true
  }
  componentWillMount () {
    const { uid } = this.props.user
    firestore
      .collection('users')
      .doc(`${uid}`)
      .collection('feed')
      .limit(10)
      .get()
      .then(snap => {
        const data = snap.docs
        data.forEach(item => {
          firestore
            .collection('posts')
            .doc(item.id)
            .get()
            .then(doc => {
              if (doc.exists) {
                const da = doc.data()
                firestore
                  .collection('users')
                  .doc(da.authorId)
                  .get()
                  .then(author => {
                    if (author.exists) {
                      const adata = author.data()
                      const previous = this.state.feed.slice()
                      const data = {
                        ...da,
                        author: adata,
                        id: item.id
                      }
                      previous.push(data)
                      this.setState({
                        feed: previous
                      })
                    }
                  })
              }
            })
        })
        this.setState({ loading: false })
      })
  }
  render () {
    return (
      <Container>
        {this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          <React.Fragment>
            {this.state.feed.map(item => (
              <Feed key={item.id}>
                <ul>
                  <span className="delete-post">&times;</span>
                  <img
                    src={item.author.photoURL}
                    alt={`${item.author.displayName}'s profile`}
                  />
                  <p>{item.text}</p>
                  <CommentBar>
                    <a href="like">Like</a>
                    <a href="comment">Comment</a>
                  </CommentBar>
                </ul>
              </Feed>
            ))}
          </React.Fragment>
        )}
      </Container>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(FeedPage)
