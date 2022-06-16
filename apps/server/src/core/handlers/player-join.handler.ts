import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { UserStatus } from '@utils/dtos/User'

type ParamUser = {
  nickname: string
}

export const PlayerJoinHandler = (
  socket: Socket,
  user: ParamUser,
  callback: (error?: string) => void
) => {
  try {
    ServerManager.addUser({
      id: socket.id,
      nickname: user.nickname,
      status: UserStatus.AWAY
    })

    callback()
  } catch (err: any) {
    callback(err.message)
  }
}
