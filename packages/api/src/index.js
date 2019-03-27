import express from 'express'
import ngrok from 'ngrok'

const { PORT } = process.env

if (PORT == null) {
  throw new Error('Environment variable PORT must be set!')
}

/**
 * Ideally, we should only open a tunnel to an external proxy service during local development. To
 * fix this, we should abstract the function that sets up the app and only call `ngrok.connect`
 * when NODE_ENV !== 'production'. Furthermore, the proxy should run as a separate process so that
 * it does not restart every time a file is changed.
 */
ngrok.connect(PORT).then(url => {
  const app = express()

  app.set('PORT', PORT)
  app.set('WEBHOOK_URL', url)

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(app.get('PORT'), () =>
    // eslint-disable-next-line no-console
    console.info(`Listening on port ${app.get('PORT')}, available at ${app.get('WEBHOOK_URL')}!`),
  )
})
