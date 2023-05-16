import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
const port = 3000

app.get('/', (_, res) => {
  res.status(200).send()
})

server.listen(port, () => console.log(`Running on port ${port}`))
