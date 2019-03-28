import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )

  if (networkError) console.log(`[Network error asdf]: ${networkError}`)
})

if (!global.fetch) {
  global.fetch = fetch
}

const createApolloClient = ({ uri, state = {}, ssrMode = false }) => {
  return new ApolloClient({
    ssrMode,
    cache: new InMemoryCache().restore(state),
    link: ApolloLink.from([errorLink, createHttpLink({ uri })]),
    defaultOptions: {
      query: { errorPolicy: 'all' },
    },
  })
}

export default createApolloClient
