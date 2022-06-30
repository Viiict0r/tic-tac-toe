import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { GameFinishReason } from 'dtos'

export const PlayerDisconnectHandler = (socket: Socket) => {
  console.log('[Debug]', socket.id, 'disconnected')

  const player = ServerManager.getPlayerById(socket.id)

  if (!player) return

  if (player.getCurrentGame()) {
    // Player in game
    const game = player.getCurrentGame()
    const adversary = game
      ?.getPlayers()
      .find(p => p.getUserId() !== player.getUserId())

    game?.finish(adversary || null, null, GameFinishReason.DISCONNECTED)
  }

  ServerManager.removeUserById(socket.id)
}
