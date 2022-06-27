import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { Player } from '@utils/models/Player'
import { Player as PlayerObject } from 'dtos'

type ParamUser = {
  name: string
}

export const PlayerJoinHandler = (
  socket: Socket,
  user: ParamUser,
  callback: (player?: PlayerObject, error?: string) => void
) => {
  try {
    const player = new Player(user.name, socket.id, socket)

    ServerManager.addUser(player)

    callback(player.toObject())
  } catch (err: any) {
    callback(undefined, err.message)
  }
}
