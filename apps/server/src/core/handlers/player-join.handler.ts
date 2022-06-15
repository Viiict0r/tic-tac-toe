import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'

export const PlayerJoinHandler = (
  socket: Socket,
  user: any,
  callback: () => void
) => {
  console.log(socket, user, callback)
}
