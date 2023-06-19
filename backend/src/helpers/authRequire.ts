import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authRequire = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET || 'default-secret',
      {},
      (err, id) => {
        if (err) {
          res.status(403).send('Invalid token')
          res.locals.id = null
          return
        }
        res.locals.id = id
        next()
      }
    )
  }

  res.locals.id = null
  res.status(403).send('Invalid token')
}

export default authRequire
