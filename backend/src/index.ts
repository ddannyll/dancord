import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
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

// Server cleanup tasks
server.addListener('close', async () => {
  // Disconnect from prisma database
  try {
    await prisma.$disconnect()
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
})
