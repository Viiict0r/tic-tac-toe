import { Router } from 'express'

import LobbyAuthService from '@services/lobby-auth.service'

const router = Router()

router.post('/', async (request, response) => {
  const { name } = request.body
  const token = await LobbyAuthService.execute({ name })

  return response.json(token)
})

export const lobbyRoutes = router
