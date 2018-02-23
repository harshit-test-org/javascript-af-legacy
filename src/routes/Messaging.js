import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import { Query, graphql, compose } from 'react-apollo'
import Baron from 'react-baron'
import gql from 'graphql-tag'
import {
  Container,
  RoomStyle,
  Chats,
  Global,
  Dms
} from '../components/styles/MessagingStyles'
import MessagesComponent from '../components/Messages'

const Room = ({ image, text, onClick }) => (
  <RoomStyle onClick={onClick}>
    <div className="img">
      <img src={image} alt="" />
    </div>
    <div className="text">{text}</div>
  </RoomStyle>
)

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
  transitionRoute = (route, name) => {
    this.props.history.push(`/social/${route}`, {
      name
    })
  }
  render () {
    const { localuser: { user } } = this.props
    return (
      <Container>
        <Chats>
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
                      <h4>Global Rooms</h4>
                      {getUserChannels.global.map(item => (
                        <Room
                          onClick={() =>
                            this.transitionRoute(item._id, item.name)
                          }
                          key={item._id}
                          image={item.imageURL}
                          text={item.name}
                        />
                      ))}
                    </Baron>
                  </Global>
                  <Dms>
                    <Baron>
                      <h4>Direct Messages</h4>
                      {getUserChannels.dms.map(item => {
                        let image = item.imageURL.split('|')
                        let name = item.name.split('|')
                        let imageIndex = image.indexOf(user.photoURL)
                        let nameIndex = name.indexOf(user.name)
                        return (
                          <Room
                            onClick={() =>
                              this.transitionRoute(item._id, name[nameIndex])
                            }
                            key={item._id}
                            image={image[imageIndex]}
                            text={name[nameIndex]}
                          />
                        )
                      })}
                    </Baron>
                  </Dms>
                </Fragment>
              )
            }}
          </Query>
        </Chats>
        <Route path="/social/:id" component={MessagesComponent} />
      </Container>
    )
  }
}

const LocalUserQuery = gql`
  query LocalUser {
    user @client {
      name
      photoURL
    }
  }
`

export default compose(
  graphql(LocalUserQuery, {
    name: 'localuser'
  })
)(Messaging)
