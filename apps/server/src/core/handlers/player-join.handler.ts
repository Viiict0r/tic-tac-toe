import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { Player } from '@utils/models/Player'

type ParamUser = {
  nickname: string
}

export const PlayerJoinHandler = (
  socket: Socket,
  user: ParamUser,
  callback: (error?: string) => void
) => {
  try {
    const player = new Player(user.nickname, socket.id, socket)

    ServerManager.addUser(player)

    callback()
  } catch (err: any) {
    callback(err.message)
  }
}
