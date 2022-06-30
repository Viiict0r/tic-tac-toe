import { v4 as uuid } from 'uuid'
import ServerManager from '@core/server-manager'
import GameManager from '@core/game/game-manager'
import { Player } from './Player'
import { Arena } from './Arena'

import {
  GameStatus,
  Game as GameObject,
  GameEvents,
  GameFinishPayload,
  GameFinishReason
} from 'dtos'

export class Game {
  private readonly id: string
  private players: Player[]
  private status: GameStatus
  private turn: string
  private arena: Arena | null
  private timeToPlay: number
  private timer: NodeJS.Timer | null = null

  constructor(players: Player[]) {
    this.id = uuid()
    this.players = players
    this.status = GameStatus.WAITING
    this.turn = ''
    this.arena = null
    this.timeToPlay = 30
  }

  public getId() {
    return this.id
  }

  public getPlayers() {
    return this.players
  }

  public getStatus() {
    return this.status
  }

  public setTurn(playerId: string) {
    this.turn = playerId
  }

  public getTurn() {
    return this.turn
  }

  public getArena() {
    return this.arena
  }

  public switchTurn() {
    if (this.turn === '') {
      this.setTurn(this.players[0].getUserId())
    } else {
      const newTurnPlayer = this.players.filter(
        p => p.getUserId() !== this.turn
      )

      this.setTurn(newTurnPlayer[0].getUserId())
    }

    if (this.timer) {
      clearInterval(this.timer)
    }

    this.timeToPlay = 30

    this.timer = setInterval(() => {
      console.log(
        '[Debug - Timer] Timer running for game',
        this.id,
        'seconds',
        this.timeToPlay
      )

      if (this.timeToPlay <= 0) {
        console.log('TEMPO ESGOTADO!')
        this.switchTurn()

        ServerManager.getConnection()
          ?.to(this.id)
          .emit(GameEvents.ON_PLAY_TIMEOUT, this.toObject())
        return
      }

      this.timeToPlay = this.timeToPlay - 1

      ServerManager.getConnection()
        ?.to(this.id)
        .emit(GameEvents.ON_TIME_PLAY_COUNT, this.toObject())
    }, 1000)
  }

  public start() {
    // Start game

    console.log('[Debug] Game #', this.id, 'started.')

    this.arena = new Arena(this.id)
    this.status = GameStatus.STARTED

    this.switchTurn()

    ServerManager.getConnection()
      ?.to(this.getId())
      .emit(GameEvents.ON_GAME_START, this.toObject())
  }

  public finish(
    winner: Player | null,
    combination: string | null,
    reason: GameFinishReason
  ) {
    console.log('[Debug] Game #', this.id, 'finished.')

    if (this.timer) {
      clearInterval(this.timer)
    }

    this.status = GameStatus.FINISHED

    ServerManager.getConnection()
      ?.to(this.id)
      .emit(GameEvents.ON_GAME_FINISH, {
        winner: winner?.toObject(),
        combination,
        game: this.toObject(),
        reason
      } as GameFinishPayload)

    this.players.forEach(player => {
      player.getConnection().leave(this.id)
      player.reset()
    })

    GameManager.destroyGame(this.id)
  }

  public toObject(): GameObject {
    return {
      id: this.id,
      players: this.players.map(player => player.toObject()),
      status: this.getStatus(),
      turn: this.getTurn(),
      arena: this.arena?.toObject(),
      timeToPlay: this.timeToPlay
    }
  }
}
