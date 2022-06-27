import ServerManager from '@core/server-manager'
import { Game } from '@utils/models/Game'
import { Player } from '@utils/models/Player'
import { PlayerSide, PlayerStatus, GameEvents } from 'dtos'

class GameManager {
  private games: Game[] = []

  public async createGame(players: Player[]) {
    const game = new Game(players)

    game.getPlayers().forEach(async (player, index) => {
      // Update players statuses
      player.setStatus(PlayerStatus.IN_GAME)

      // Set player play side
      player.setSide(index === 0 ? PlayerSide.X : PlayerSide.O)

      // Join on game room
      await player.getConnection().join(game.getId())
    })

    ServerManager.getConnection()
      ?.to(game.getId())
      .emit(GameEvents.ON_MATCH_FIND, game.toObject())

    this.games.push(game)

    setTimeout(() => {
      game.start()
    }, 3000)
  }

  public destroyGame(id: string) {
    this.games = this.games.filter(game => game.getId() !== id)

    console.log('[Debug] Game #', id, 'destroyed.')
  }

  public getAllCurrentGames() {
    return this.games
  }
}

export default new GameManager()
