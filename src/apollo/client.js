import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import resolvers from './resolvers'

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
  credentials: 'include'
})

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  resolvers,
  defaults: {
    user: null
  }
})

const link = ApolloLink.from([stateLink, httpLink])

const client = new ApolloClient({
  link,
  cache
})

export default client
