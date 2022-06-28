import ServerManager from '@core/server-manager'
import { Events } from 'dtos'

import { PlayerJoinHandler } from './handlers/player-join.handler'
import { PlayerMatchQueue } from './handlers/player-match-queue.handler'
import { PlayerQuitHandler } from './handlers/player-quit.handler'
import { PlayerPlayHandler } from './handlers/player-play.handler'

class EventHandler {
  public registerHandlers() {
    // Register all event handlers
    ServerManager.registerListener(
      Events.ON_PLAYER_JOIN_LOBBY,
      PlayerJoinHandler
    )
    ServerManager.registerListener(
      Events.ON_PLAYER_LEAVE_LOBBY,
      PlayerQuitHandler
    )
    ServerManager.registerListener(
      Events.ON_PLAYER_SEARCH_MATCH,
      PlayerMatchQueue
    )
    ServerManager.registerListener(Events.MAKE_PLAY, PlayerPlayHandler)
  }
}

export default new EventHandler()
