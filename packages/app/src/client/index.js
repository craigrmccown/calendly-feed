/* eslint-env browser */

import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import createApolloClient from '../shared/services/createApolloClient'
import Env from '../shared/services/Env'
import App from '../shared/App'

// eslint-disable-next-line no-underscore-dangle
const client = createApolloClient({ uri: Env.API_URL, state: window.__APOLLO_STATE__ })

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
