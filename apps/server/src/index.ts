import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'

import ServerManager from '@core/server-manager'
import EventHandler from '@core/event-handler'

import routes from './routes'
import AppError from './errors/AppError'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

EventHandler.registerHandlers()
ServerManager.init(app)
