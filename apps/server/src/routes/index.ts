import { Router } from 'express'

import { gameRoutes } from './game.routes'
import { lobbyRoutes } from './lobby.routes'

const router = Router()

router.use('/game', gameRoutes)
router.use('/lobby', lobbyRoutes)

export default router
