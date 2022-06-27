import { Router } from 'express'

import GameValidationService from '@services/game-validation.service'
import { TokenMiddleware } from 'src/middlewares/token.middleware'

const router = Router()

router.use(TokenMiddleware)
router.get('/:game_id', GameValidationService.execute)

export const gameRoutes = router
