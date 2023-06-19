import express from 'express'
import { Prisma, User, Server } from '@prisma/client'
import prisma from '../helpers/prisma'
import 'dotenv/config'

const router = express.Router()

export default router
