import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, split } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import resolvers from './resolvers'

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
  credentials: 'include'
})

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_WS_URI}/subscriptions`,
  options: {
    reconnect: true
  }
})

const networkLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  resolvers,
  defaults: {
    user: null
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const link = ApolloLink.from([errorLink, stateLink, networkLink])

const client = new ApolloClient({
  link,
  cache
})

export default client
