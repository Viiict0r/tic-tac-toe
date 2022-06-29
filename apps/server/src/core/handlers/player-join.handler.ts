import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { verify } from 'jsonwebtoken'
import { Player } from '@utils/models/Player'
import { Player as PlayerObject } from 'dtos'
import { config } from 'src/config/token'

type ParamUser = {
  name: string
  avatar: string
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

    if (!user.avatar) {
      callback(undefined, 'Selecione um avatar.')
    }

    // Validate username
    const regex = /[^A-Za-z0-9_@]/g

    if (!user.name || user.name.length < 3) {
      callback(undefined, 'Seu nickname deve ter ao menos 3 caracteres.')
      return
    }

    if (regex.test(user.name)) {
      callback(undefined, 'Seu nickname não pode conter caracteres especiais.')
      return
    }

    if (user.name.length > 16) {
      callback(undefined, 'Seu nickname deve ter no máximo 16 caracteres.')
      return
    }

    const decoded = verify(user.token, config.secret)

    const { sub: tokenName } = decoded

    if (tokenName !== user.name) {
      callback(undefined, 'Token inválido')
    }

    const player = new Player(
      user.name,
      socket.id,
      socket,
      user.token,
      user.avatar
    )

    ServerManager.addUser(player)

    callback(player.toObject())
  } catch (err: any) {
    callback(undefined, err.message)
  }
}
