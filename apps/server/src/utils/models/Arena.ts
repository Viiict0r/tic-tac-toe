import {
  ArenaPlay,
  ArenaPositions,
  ArenaPositionValue,
  GameEvents,
  Arena as ArenaObject
} from 'dtos'
import GameManager from '@core/game/game-manager'
import ServerManager from '@core/server-manager'

export class Arena {
  private readonly gameId: string
  private plays: ArenaPlay[] = []

  constructor(gameId: string) {
    this.gameId = gameId
  }

  public makePlay(
    playerToken: string,
    position: ArenaPositions,
    value: ArenaPositionValue
  ) {
    const isSlotNotEmpty = this.plays.find(pos => pos.position === position)
    const game = GameManager.getAllCurrentGames().find(
      g => g.getId() === this.gameId
    )

    if (!game) {
      console.log(`[Debug-${this.gameId}] ERROR Game not found.`)

      throw new Error('Game not found')
    }

    if (isSlotNotEmpty) {
      console.log(`[Debug-${this.gameId}] ERROR Slot ${position} not empty.`)

      throw new Error('Slot not empty')
    }

    const playerByToken = ServerManager.getUsers().find(
      usr => usr.getToken() === playerToken
    )

    if (!playerByToken) {
      throw new Error('Player not found')
    }

    // TODO: Validar posicao, valor e jogador
    if (game.getTurn() !== playerByToken.getUserId()) {
      throw new Error('Não é sua vez de jogar')
    }

    const play: ArenaPlay = {
      position,
      value,
      playerToken
    }

    this.plays.push(play)

    game.switchTurn()

    ServerManager.getConnection()
      ?.to(this.gameId)
      .emit(GameEvents.ON_USER_PLAY, game.toObject())
  }

  public getPlays() {
    return this.plays
  }

  public toObject(): ArenaObject {
    return {
      plays: this.plays
    }
  }
}
