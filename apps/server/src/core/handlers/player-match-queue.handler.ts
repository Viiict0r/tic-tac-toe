import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { PlayerStatus } from 'dtos'

type ParamUser = {
  name: string
  action: 'enter' | 'leave'
}

export const PlayerMatchQueue = (
  socket: Socket,
  user: ParamUser,
  callback: (error?: string) => void
) => {
  ServerManager.updateUserStatus(
    user.name,
    user.action === 'enter' ? PlayerStatus.SEARCHING : PlayerStatus.AWAY
  )

  callback()
}
