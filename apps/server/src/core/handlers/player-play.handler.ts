/* eslint-disable n/no-callback-literal */
import { Socket } from 'socket.io'

import ServerManager from '@core/server-manager'
import { ArenaPositions, ArenaPositionValue, PlayerSide } from 'dtos'

type ParamPlay = {
  token: string
  name: string
  position: ArenaPositions
}

export const PlayerPlayHandler = (
  socket: Socket,
  play: ParamPlay,
  callback: (error: string) => void
) => {
  try {
    if (!play.token) {
      callback('Token inválido.')
      return
    }

    const findPlayerByToken = ServerManager.getUsers().find(
      usr => usr.getToken() === play.token
    )

    if (!findPlayerByToken) {
      callback('Jogador não encontrado')
    }

    if (findPlayerByToken?.getUsername() !== play.name) {
      callback('Jogador inválido')
    }

    const game = findPlayerByToken?.getCurrentGame()

    if (!game) {
      callback('Você não está em nenhum jogo.')
    }

    // TODO: Improve this code
    console.log('PLAYED', play)
    const playValue =
      findPlayerByToken?.getSide() === PlayerSide.X
        ? ArenaPositionValue.X
        : ArenaPositionValue.O

    game?.getArena()?.makePlay(play.token, play.position, playValue)
  } catch (err: any) {
    callback(err.message)
  }
}
