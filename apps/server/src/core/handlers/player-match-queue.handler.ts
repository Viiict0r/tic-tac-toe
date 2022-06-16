import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { UserStatus } from '@utils/dtos/User'

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
    user.action === 'enter' ? UserStatus.SEARCHING : UserStatus.AWAY
  )

  callback()
}
