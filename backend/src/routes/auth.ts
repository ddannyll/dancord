import express from 'express'
import { Prisma, User } from '@prisma/client'
import prisma from '../helpers/prisma'
import crypto from 'crypto-js'
import uuid from 'uuid'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(403).send({ error: 'Invalid Input' })
  }

  let user
  try {
    user = await prisma.user.create({
      data: {
        id: 'user-' + uuid.v1(),
        username: username,
        nickname: username,
        hashPassword: crypto.SHA256(password).toString(),
        joinedServers: {
          create: [],
        },
        ownedServers: {
          create: [],
        },
        messages: {
          create: [],
        },
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.status(400).send('Username must be unique')
        return
      }
    }
    // Something went wrong
    throw e
  }

  const token = jwt.sign(
    user as User,
    process.env.ACCESS_TOKEN_SECRET || 'default-secret'
  )

  res.status(200).send({ token })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(403).send({ error: 'Invalid Input' })
  }

  const hashPassword = crypto.SHA256(password).toString()
  const user = await prisma.user.findFirst({
    where: {
      username,
      hashPassword,
    },
  })
  if (!user) {
    res.status(403).send({ error: 'Username or password is incorrect' })
  }

  const token = jwt.sign(
    user as User,
    process.env.ACCESS_TOKEN_SECRET || 'default-secret'
  )

  res.status(200).send({ token })
})

export default router
