import express from 'express'
import { Prisma, User } from '@prisma/client'
import prisma from '../helpers/prisma'
import crypto from 'crypto-js'
import uuid from 'uuid'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const router = express.Router()

const expireDuration = 3 * 24 * 60 * 60
const generateJWT = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET || 'default-secret', {
    expiresIn: expireDuration,
  })
}

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(403).send({ error: 'Empty email or password' })
    return
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

  const token = generateJWT(user.id)
  res.cookie('jwt', token, { httpOnly: true, maxAge: expireDuration * 1000 })
  res.status(200).send({ id: user.id })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(403).send({ error: 'Invalid Input' })
    return
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
    return
  }

  const token = generateJWT((user as User).id)
  res.cookie('jwt', token, { httpOnly: true, maxAge: expireDuration * 1000 })
  res.status(200).send({ id: (user as User).id })
})

router.post('/logout', async (_req, res) => {
  res.clearCookie('jwt')
  res.status(200)
})

export default router
