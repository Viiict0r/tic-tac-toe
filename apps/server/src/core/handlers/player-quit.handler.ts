import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'

type ParamUser = {
  name: string
}

export const PlayerQuitHandler = (socket: Socket, user: ParamUser) => {
  ServerManager.removeUserByNickname(user.name)
}
