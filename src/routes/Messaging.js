import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import { Query, graphql, compose } from 'react-apollo'
import Baron from 'react-baron'
import styled from 'styled-components'
import gql from 'graphql-tag'
import {
  Container,
  RoomStyle,
  Chats,
  Global
} from '../components/styles/MessagingStyles'
import AddIcon from '../assets/icons/add'
import Messages from '../components/Messages'
import SearchModal from '../components/MessageSearch'

const Room = ({ image, text, onClick, ...props }) => (
  <RoomStyle onClick={onClick} {...props}>
    <div className="img">
      <img src={image} alt="" />
    </div>
    <div className="text">{text}</div>
  </RoomStyle>
)

const RoomTitle = styled.div`
  display: flex;
  & h4 {
    flex: 5;
  }
  & span {
    flex: 1;
    display: flex;
    align-items: center;
  }
`

const RoomsQuery = gql`
  query RoomsQuery {
    getUserChannels {
      dms {
        _id
        name
        imageURL
      }
      global {
        _id
        name
        imageURL
      }
    }
  }
`

class Messaging extends Component {
  state = {
    globalSearch: false,
    dmSearch: false
  }
  toggleModal = globalOne => {
    if (globalOne) {
      this.setState(state => ({
        globalSearch: !state.globalSearch
      }))
    } else {
      this.setState(state => ({
        globalSearch: !state.dmSearch
      }))
    }
  }
  transitionRoute = (route, name) => {
    this.props.history.push(`/social/${route}`, {
      name
    })
  }
  render () {
    const pathname = this.props.location.pathname
    const isChatOpen =
      pathname.substring(1, pathname.length).split('/')[1] !== undefined
    return (
      <Container chatOpen={isChatOpen}>
        <Chats chatOpen={isChatOpen}>
          <h2>Messaging</h2>
          <Query query={RoomsQuery}>
            {result => {
              if (result.loading) return null
              if (result.error) return null

              const { data: { getUserChannels } } = result

              return (
                <Fragment>
                  <Helmet>
                    <title>Messaging| Javascript.af</title>
                  </Helmet>
                  <Global>
                    <Baron>
                      <RoomTitle>
                        <h4>Rooms</h4>
                        <span>
                          <AddIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.toggleModal(true)}
                          />
                        </span>
                      </RoomTitle>
                      {getUserChannels.global.map(item => (
                        <Room
                          onClick={() =>
                            this.transitionRoute(item._id, item.name)
                          }
                          className={
                            `/social/${item._id}` ===
                            this.props.location.pathname
                              ? 'active'
                              : ''
                          }
                          key={item._id}
                          image={item.imageURL}
                          text={item.name}
                        />
                      ))}
                    </Baron>
                  </Global>
                </Fragment>
              )
            }}
          </Query>
        </Chats>
        <SearchModal
          toggle={() => this.toggleModal(true)}
          open={this.state.globalSearch}
        />
        <SearchModal
          toggle={() => this.toggleModal(false)}
          open={this.state.dmSearch}
        />
        <Route
          path="/social/:id"
          render={props => (
            <Messages
              chatOpen={isChatOpen}
              user={this.props.localuser.user}
              {...props}
            />
          )}
        />
      </Container>
    )
  }
}

const LocalUserQuery = gql`
  query LocalUser {
    user @client {
      name
      photoURL
      _id
    }
  }
`

export default compose(
  graphql(LocalUserQuery, {
    name: 'localuser'
  })
)(Messaging)
