import cron from 'node-cron'

import ServerManager from '@core/server-manager'
import GameManager from '@core/game/game-manager'
import { PlayerStatus } from 'dtos'

class GameMatchJob {
  public execute() {
    cron.schedule('*/5 * * * * *', () => {
      const searchingPlayers = ServerManager.getUsers().filter(
        usr => usr.getStatus() === PlayerStatus.SEARCHING
      )

      console.log(
        searchingPlayers.map(p => [p.getStatus(), p.getUsername()]),
        ServerManager.getUsers().map(p => [p.getStatus(), p.getUsername()])
      )

      if (searchingPlayers.length < 2) return

      const players = [searchingPlayers[0], searchingPlayers[1]]
      console.log(
        'aaaa',
        players.map(p => [p.getStatus(), p.getUsername()])
      )

      GameManager.createGame(players)
    })
  }
}

export default new GameMatchJob()
