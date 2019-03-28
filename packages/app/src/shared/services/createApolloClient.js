import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )

  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

if (!global.fetch) {
  global.fetch = fetch
}

const createApolloClient = ({ uri, ws, state = {}, ssrMode = false }) => {
  return new ApolloClient({
    ssrMode,
    cache: new InMemoryCache().restore(state),
    link: ApolloLink.from([
      errorLink,
      split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)

          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        new WebSocketLink({
          uri: uri.replace(/^https?/, 'ws'),
          options: { reconnect: true },
          webSocketImpl: ws,
        }),
        createHttpLink({ uri }),
      ),
    ]),
    defaultOptions: {
      query: { errorPolicy: 'all' },
    },
  })
}

export default createApolloClient
