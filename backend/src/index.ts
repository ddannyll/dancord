import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import authRouter from './routes/auth'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
const port = 3000

// Baseline request
app.get('/', (_, res) => {
  res.status(200).send()
})

// Routes
app.use('/auth', authRouter)

server.listen(port, () => console.log(`Running on port ${port}`))
