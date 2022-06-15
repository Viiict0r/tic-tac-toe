import ServerManager from '@core/server-manager'
import { Events } from '@utils/events'

import { PlayerJoinHandler } from './handlers/player-join.handler'

class EventHandler {
  public registerHandlers() {
    // Register all event handlers
    ServerManager.registerListener(Events.JOIN_LOBBY, PlayerJoinHandler)
  }
}

export default new EventHandler()
