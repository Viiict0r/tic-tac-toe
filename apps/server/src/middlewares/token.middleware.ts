import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { config } from 'src/config/token'
import AppError from 'src/errors/AppError'

export const TokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token is missing', 403)
  }

  const [, token] = authHeader.split(' ')

  try {
    verify(token, config.secret)

    next()
  } catch {
    throw new AppError('Invalid token', 403)
  }
}
