import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import authRouter from './routes/auth'
import serverRouter from './routes/server'
import cookieParser from 'cookie-parser'
import authRequire from './helpers/authRequire'

const app = express()
const server = http.createServer(app)
const port = 3000
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

// middleware
app.use(express.json())
app.use(cookieParser())

// Baseline request
app.get('/', (_, res) => {
  res.status(200).send()
})

// Routes
app.use('/auth', authRouter)
// authRequre verifies the jwt token before running the actual route
app.use('/server', authRequire, serverRouter)

server.listen(port, () => console.log(`Running on port ${port}`))
