/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ArenaPlay,
  ArenaPositions,
  ArenaPositionValue,
  GameEvents,
  Arena as ArenaObject,
  GameStatus,
  GameFinishReason
} from 'dtos'

import GameManager from '@core/game/game-manager'
import ServerManager from '@core/server-manager'

export class Arena {
  private plays: ArenaPlay[] = []
  private readonly gameId: string
  private readonly winCombinations: ArenaPositions[][] = [
    ['A1', 'B1', 'C1'],
    ['C1', 'B1', 'A1'],
    ['A2', 'B2', 'C2'],
    ['C2', 'B2', 'A2'],
    ['A3', 'B3', 'C3'],
    ['C3', 'B3', 'A3'],
    ['A1', 'A2', 'A3'],
    ['A3', 'A2', 'A1'],
    ['B1', 'B2', 'B3'],
    ['B3', 'B2', 'B1'],
    ['C1', 'C2', 'C3'],
    ['C3', 'C2', 'C1'],
    ['A1', 'B2', 'C3'],
    ['C3', 'B2', 'A1'],
    ['A3', 'B2', 'C1'],
    ['C1', 'B2', 'A3']
  ]

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

    this.processPlay(play)
  }

  public getPlays() {
    return this.plays
  }

  private processPlay(play: ArenaPlay) {
    // TODO: Verificar empate
    const userPlays = this.plays.filter(p => p.playerToken === play.playerToken)

    if (userPlays.length < 3) {
      console.log(
        '[Game Win Debug]',
        this.gameId,
        'insuficient plays to check win combination.'
      )
      return
    }

    const game = GameManager.getAllCurrentGames().find(
      g => g.getId() === this.gameId
    )

    this.winCombinations.forEach(combination => {
      const pls = userPlays.filter(
        play => !!combination.find(pos => pos === play.position)
      )

      console.log(
        '[Game Win Debug] Plays:',
        pls.map(p => p.position)
      )
      if (pls.length === 3) {
        const playerByToken = ServerManager.getUsers().find(
          usr => usr.getToken() === play.playerToken
        )

        game?.finish(
          playerByToken!,
          `${combination[0]}_${combination[1]}_${combination[2]}`,
          GameFinishReason.GAME_WIN
        )

        console.log(
          '[Game Win Debug]',
          playerByToken?.getUsername(),
          'win the game with combination:',
          combination
        )
      }
    })

    // Check tie
    if (this.plays.length >= 9 && game?.getStatus() !== GameStatus.FINISHED) {
      game?.finish(null, null, GameFinishReason.GAME_TIED)

      console.log('[Game Win Debug] Game finished due tie...')
    }
  }

  public toObject(): ArenaObject {
    return {
      plays: this.plays
    }
  }
}
