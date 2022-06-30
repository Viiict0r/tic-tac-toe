import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'

type ParamUser = {
  name: string
}

export const PlayerDisconnectHandler = (socket: Socket, user: ParamUser) => {
  // Check player is in game and end-it
  ServerManager.removeUserByNickname(user.name)
}
