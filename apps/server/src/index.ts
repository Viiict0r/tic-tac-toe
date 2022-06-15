import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import ServerManager from '@core/server-manager'
import EventHandler from '@core/event-handler'

dotenv.config()

const app = express()

app.use(cors())

EventHandler.registerHandlers()
ServerManager.init(app)
