import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v4'
import Helmet from 'react-helmet'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { MessageBar } from './styles/MessagingStyles'

function isDuplicateMessage (newMessage, existingMessages) {
  return (
    (newMessage.uid !== null &&
      existingMessages.some(message => newMessage.uid === message.uid)) ||
    (newMessage._id !== null &&
      existingMessages.some(message => newMessage._id === message._id))
  )
}

const MsgContainer = styled.div`
  position: relative;
  background: 0 0;
  margin: 0.5rem 0 0;
  padding: 0.5rem 0 0;
  border: none;
  border-top: none;
  line-height: 1.2;
  margin-left: 0.5rem;
  & a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.83);
    transition: all 0.1s ease-in;
  }
  & a:hover {
    color: rgba(0, 0, 0, 0.6);
  }
  & .img {
    display: block;
    width: 2.5rem;
    height: auto;
    float: left;
    margin: 0.2rem 0 0;
  }
  & img {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
  }
  & .data {
    margin-left: 3.5rem;
  }
  & .author {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.87);
    font-weight: 700;
  }
  & .date {
    display: inline-block;
    margin-left: 0.5rem;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.7rem;
  }
  & .text {
    margin: 0.25em 0 0.5rem;
    font-size: 1rem;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.87);
    line-height: 1.3;
  }
`

const Message = ({ text, date, image, author, aid }) => {
  return (
    <MsgContainer>
      <div className="img">
        <Link to={`/user/${aid}`}>
          <img src={image} alt="" />
        </Link>
      </div>
      <div className="data">
        <div className="author">
          <Link to={`/user/${aid}`}>{author}</Link>
          <span className="date">{new Date(date).toLocaleString()}</span>
        </div>
        <div className="text">{text}</div>
      </div>
    </MsgContainer>
  )
}

class MessagesRoute extends Component {
  constructor (props) {
    super()
    this.state = {
      message: ''
    }
  }
  handleChange = e => {
    this.setState({
      message: e.target.value
    })
  }
  sendMessage = async e => {
    e.preventDefault()
    const { message } = this.state
    if (message) {
      this.setState({
        message: ''
      })
      const uid = uuid()
      this.props
        .mutate({
          variables: {
            text: message,
            channelId: this.props.match.params.id,
            uid
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createMessage: {
              _id: `${Math.floor(Math.random() * -100000)}-oui`,
              uid: uid,
              text: message,
              channelId: this.props.match.params.id,
              createdAt: new Date().toISOString(),
              author: {
                _id: this.props.user._id,
                name: this.props.user.name,
                photoURL: this.props.user.photoURL,
                __typename: 'User'
              },
              __typename: 'Message'
            }
          },
          update: (store, { data: { createMessage } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: MessageQuery,
              variables: {
                channelId: this.props.match.params.id
              }
            })
            if (isDuplicateMessage(createMessage, data.getMessages)) {
              return data
            }
            data.getMessages.push(createMessage)
            store.writeQuery({
              query: MessageQuery,
              variables: {
                channelId: this.props.match.params.id
              },
              data
            })
          }
        })
        .catch(error => {
          console.log('there was an error sending the query', error)
        })
    }
  }
  componentWillMount () {
    if (this.unsubscribe) {
      return
    }
    this.unsubscribe = this.props.subscribeToNewMessages({
      channelId: this.props.match.params.id
    })
  }

  scrollToBottom = async () => {
    let msgContainer = document.getElementById('msgContainer')
    if (!msgContainer) {
      await new Promise(resolve => setTimeout(resolve, 200))
      msgContainer = document.getElementById('msgContainer')
    }
    if (this.props.getMessages.getMessages && msgContainer) {
      const scrollHeight = msgContainer.scrollHeight
      const height = msgContainer.clientHeight
      const maxScrollTop = scrollHeight - height
      msgContainer.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }
  componentDidUpdate (props) {
    if (!props.getMessages.getMessages && this.props.getMessages.getMessages) {
      this.scrollToBottom()
    }
    if (props.match.url !== this.props.match.url) {
      this.scrollToBottom()
    }
    if (
      props.getMessages &&
      props.getMessages.getMessages &&
      this.props.getMessages.getMessages.length -
        props.getMessages.getMessages.length ===
        1
    ) {
      this.scrollToBottom()
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
      this.unsubscribe = this.props.subscribeToNewMessages({
        channelId: nextProps.match.params.id
      })
    }
  }
  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
  render () {
    const { getMessages, loading } = this.props.getMessages
    if (loading || !getMessages) {
      return null
    }
    const { location: { state: { name = 'Chat' } }, chatOpen } = this.props
    return (
      <Fragment>
        <Helmet>
          <title>{name} | Javascript.af</title>
        </Helmet>
        <div id="msgContainer" className={chatOpen ? 'chat' : 'chat__closed'}>
          {getMessages.map((item, i) => (
            <Message
              key={`msgindex-${i}`}
              text={item.text}
              date={item.createdAt}
              aid={item.author._id}
              image={item.author.photoURL}
              author={item.author.name}
            />
          ))}
        </div>
        <MessageBar chatOpen={chatOpen}>
          <form onSubmit={this.sendMessage}>
            <input
              value={this.state.message}
              onChange={this.handleChange}
              type="text"
              placeholder="Whats in your mind..."
            />
          </form>
        </MessageBar>
      </Fragment>
    )
  }
}

const MsgSubscriptions = gql`
  subscription newMessage($channelId: ID!) {
    msg(channelId: $channelId) {
      _id
      uid
      text
      channelId
      author {
        _id
        name
        photoURL
      }
      createdAt
    }
  }
`

const MessageQuery = gql`
  query MessagesQuery($channelId: ID!, $offset: Int) {
    getMessages(channelId: $channelId, offset: $offset) {
      createdAt
      uid
      author {
        _id
        name
        photoURL
      }
      channelId
      _id
      text
    }
  }
`

const sendMessage = gql`
  mutation sendMessage($text: String!, $channelId: ID!, $uid: ID!) {
    createMessage(text: $text, channelId: $channelId, uid: $uid) {
      _id
      text
      uid
      channelId
      author {
        _id
        name
        photoURL
      }
      createdAt
    }
  }
`

export default compose(
  graphql(MessageQuery, {
    name: 'getMessages',
    options: ({ match: { params } }) => ({
      variables: { channelId: params.id },
      fetchPolicy: 'network-first'
    }),
    props: props => {
      return {
        ...props,
        subscribeToNewMessages: params => {
          return props.getMessages.subscribeToMore({
            document: MsgSubscriptions,
            variables: {
              channelId: params.channelId
            },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev
              }
              const newFeedItem = subscriptionData.data.msg
              if (isDuplicateMessage(newFeedItem, prev.getMessages)) {
                return prev
              }
              const data = Object.assign({}, prev, {
                getMessages: [...prev.getMessages, newFeedItem]
              })
              return data
            }
          })
        }
      }
    }
  }),
  graphql(sendMessage)
)(MessagesRoute)
