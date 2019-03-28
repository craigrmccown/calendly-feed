import '@babel/polyfill'

import React from 'react'
import express from 'express'
import PromiseRouter from 'express-promise-router'
import { html } from 'common-tags'
import { ServerStyleSheet } from 'styled-components'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'

import App from '../shared/App'
import ServerEnv from './services/Env'
import SharedEnv from '../shared/services/Env'
import createApolloClient from '../shared/services/createApolloClient'

const { PORT, WDS_PORT, API_URL } = ServerEnv
const app = express()
const router = new PromiseRouter()

router.get('*', async (req, res) => {
  const sheet = new ServerStyleSheet()
  const client = createApolloClient({ uri: API_URL, ssrMode: true })
  const appHtml = await renderToStringWithData(
    sheet.collectStyles(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    ),
  )
  const documentHtml = html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR React App</title>
        ${sheet.getStyleTags()}
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
      <script>
        window.process = { env: ${JSON.stringify(SharedEnv)} }
      </script>
      <script>
        window.__APOLLO_STATE__ = ${// The string replacement protects against XSS attacks.
        JSON.stringify(client.extract()).replace(/</g, '\\u003c')}
      </script>
      <script src="http://localhost:${WDS_PORT}/bundle.js"></script>
    </html>
  `

  res.send(documentHtml)
})

app.use(router)

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}...`) // eslint-disable-line no-console
})
