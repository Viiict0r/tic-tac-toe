import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { PlayerStatus } from '@utils/models/Player'

type ParamUser = {
  nickname: string
  action: 'enter' | 'leave'
}

export const PlayerMatchQueue = (
  socket: Socket,
  user: ParamUser,
  callback: (error?: string) => void
) => {
  ServerManager.updateUserStatus(
    user.nickname,
    user.action === 'enter' ? PlayerStatus.SEARCHING : PlayerStatus.AWAY
  )

  callback()
}
