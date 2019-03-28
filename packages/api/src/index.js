import express from 'express'
import ngrok from 'ngrok'
import path from 'path'
import { createServer } from 'http'
import { ApolloServer, gql } from 'apollo-server-express'
import { PubSub } from 'apollo-server'

import concatFiles from './services/concatFiles'
import resolvers from './resolvers'
import Calendly from './services/calendly'

const { PORT, CALENDLY_API_TOKEN } = process.env

if (PORT == null || CALENDLY_API_TOKEN == null) {
  throw new Error('Environment variables PORT and CALENDLY_API_TOKEN must be set!')
}

const calendly = new Calendly(CALENDLY_API_TOKEN)

/**
 * Ideally, we should only open a tunnel to an external proxy service during local development. To
 * fix this, we should abstract the function that sets up the app and only call `ngrok.connect`
 * when NODE_ENV !== 'production'. Furthermore, the proxy should run as a separate process so that
 * it does not restart every time a file is changed.
 */
ngrok.connect(parseInt(PORT, 10)).then(async url => {
  const app = express()
  const server = createServer(app)
  const pubsub = new PubSub()

  app.set('PORT', PORT)
  app.set('WEBHOOK_URL', url)
  app.set('APOLLO_PUBSUB', pubsub)

  const typeDefs = gql`
    ${await concatFiles(path.join(__dirname, './schema'))}
  `
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ calendly }),
    subscriptions: {
      onConnect: () => ({ pubsub }),
    },
    context: ({ connection }) => (connection ? connection.context : {}),
  })

  app.use(express.json())

  app.post('/invitee-events', ({ body }) => {
    // eslint-disable-next-line no-console
    console.info(`Received webhook request: ${body.event}`)

    return pubsub.publish(
      body.event === 'invitee.created' ? 'INVITEE_CREATED' : 'INVITEE_CANCELED',
      body,
    )
  })

  apollo.applyMiddleware({ app, path: '/graphql' })
  apollo.installSubscriptionHandlers(server)

  server.listen(app.get('PORT'), async () => {
    // eslint-disable-next-line no-console
    console.info(`Listening on port ${app.get('PORT')}, available at ${app.get('WEBHOOK_URL')}!`)

    // eslint-disable-next-line no-console
    console.info('Cleaning up active Calendly webhook subscriptions...')

    calendly.initialize({ context: {} }, undefined)
    await calendly.deleteWebhookSubscriptions()
    await calendly.createWebhookSubscription(`${url}/invitee-events`)

    // eslint-disable-next-line no-console
    console.info('Calendly webhook subscriptions are cleaned!')
  })
})

process.on('SIGTERM', async () => {
  // eslint-disable-next-line no-console
  console.info('Shutting down gracefully...')

  await calendly.deleteWebhookSubscriptions()

  process.exit(0)
})
