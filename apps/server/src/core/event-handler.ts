import ServerManager from '@core/server-manager'
import { Events } from '@utils/events'

import { PlayerJoinHandler } from './handlers/player-join.handler'
import { PlayerMatchQueue } from './handlers/player-match-queue.handler'
import { PlayerQuitHandler } from './handlers/player-quit.handler'

class EventHandler {
  public registerHandlers() {
    // Register all event handlers
    ServerManager.registerListener(Events.JOIN_LOBBY, PlayerJoinHandler)
    ServerManager.registerListener(Events.LEAVE_LOBBY, PlayerQuitHandler)
    ServerManager.registerListener(Events.SEARCH_MATCH, PlayerMatchQueue)
  }
}

export default new EventHandler()
