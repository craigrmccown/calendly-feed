import express from 'express'

const app = express()
const { PORT } = process.env

if (PORT == null) {
  throw new Error('Environment variable PORT must be set!')
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.info(`Listening on port ${PORT}!`)) // eslint-disable-line no-console
