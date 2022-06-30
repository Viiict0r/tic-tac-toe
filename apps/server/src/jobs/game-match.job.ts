import cron from 'node-cron'

import ServerManager from '@core/server-manager'
import GameManager from '@core/game/game-manager'
import { PlayerStatus } from 'dtos'

class GameMatchJob {
  public execute() {
    cron.schedule('*/15 * * * * *', () => {
      const searchingPlayers = ServerManager.getUsers().filter(
        usr => usr.getStatus() === PlayerStatus.SEARCHING
      )

      if (searchingPlayers.length < 2) return

      const players = [searchingPlayers[0], searchingPlayers[1]]

      GameManager.createGame(players)
    })
  }
}

export default new GameMatchJob()
