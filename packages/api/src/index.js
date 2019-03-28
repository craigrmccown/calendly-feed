import express from 'express'
import ngrok from 'ngrok'
import { ApolloServer, gql } from 'apollo-server-express'
import path from 'path'

import concatFiles from './services/concatFiles'
import resolvers from './resolvers'
import Calendly from './services/calendly'

const { PORT, CALENDLY_API_TOKEN } = process.env

if (PORT == null || CALENDLY_API_TOKEN == null) {
  throw new Error('Environment variables PORT and CALENDLY_API_TOKEN must be set!')
}

/**
 * Ideally, we should only open a tunnel to an external proxy service during local development. To
 * fix this, we should abstract the function that sets up the app and only call `ngrok.connect`
 * when NODE_ENV !== 'production'. Furthermore, the proxy should run as a separate process so that
 * it does not restart every time a file is changed.
 */
ngrok.connect(PORT).then(async url => {
  const typeDefs = gql`
    ${await concatFiles(path.join(__dirname, './schema'))}
  `
  const dataSources = () => ({ calendly: new Calendly(CALENDLY_API_TOKEN) })

  const apollo = new ApolloServer({ typeDefs, resolvers, dataSources })
  const app = express()

  app.set('PORT', PORT)
  app.set('WEBHOOK_URL', url)

  app.get('/', (req, res) => res.send('Hello World!'))

  apollo.applyMiddleware({ app, path: '/graphql' })

  app.listen(app.get('PORT'), () =>
    // eslint-disable-next-line no-console
    console.info(`Listening on port ${app.get('PORT')}, available at ${app.get('WEBHOOK_URL')}!`),
  )
})
