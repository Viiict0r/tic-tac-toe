import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { verify } from 'jsonwebtoken'
import { Player } from '@utils/models/Player'
import { Player as PlayerObject } from 'dtos'
import { config } from 'src/config/token'

type ParamUser = {
  name: string
  token: string
}

export const PlayerJoinHandler = (
  socket: Socket,
  user: ParamUser,
  callback: (player?: PlayerObject, error?: string) => void
) => {
  try {
    if (!user.token) {
      callback(undefined, 'Token inválido.')
      return
    }

    const decoded = verify(user.token, config.secret)

    const { sub: tokenName } = decoded

    if (tokenName !== user.name) {
      callback(undefined, 'Token inválido')
    }

    const player = new Player(user.name, socket.id, socket, user.token)

    ServerManager.addUser(player)

    callback(player.toObject())
  } catch (err: any) {
    callback(undefined, err.message)
  }
}
