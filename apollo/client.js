import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, split } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import resolvers from './resolvers'
import fetch from 'isomorphic-unfetch'

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
  credentials: 'include'
})
const cache = new InMemoryCache()

let link = null

if (process.browser) {
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

  link = ApolloLink.from([errorLink, stateLink, networkLink])
}

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, cookie = null) {
  const authLink = setContext((_, { headers }) => {
    console.log(headers)
    return {
      headers: {
        ...headers,
        Cookie: cookie
      }
    }
  })
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: process.browser ? link : authLink.concat(httpLink),
    cache: cache.restore(initialState || {})
  })
}

export default function initApollo (initialState, cookie) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, cookie)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
