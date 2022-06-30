import { v4 as uuid } from 'uuid'
import ServerManager from '@core/server-manager'
import { Player } from './Player'
import {
  GameStatus,
  Game as GameObject,
  GameEvents,
  GameFinishPayload
} from 'dtos'
import { Arena } from './Arena'

export class Game {
  private readonly id: string
  private players: Player[]
  private status: GameStatus
  private turn: string
  private arena: Arena | null

  constructor(players: Player[]) {
    this.id = uuid()
    this.players = players
    this.status = GameStatus.WAITING
    this.turn = ''
    this.arena = null
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
      return
    }

    const newTurnPlayer = this.players.filter(p => p.getUserId() !== this.turn)

    this.setTurn(newTurnPlayer[0].getUserId())
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

  public finish(winner: Player | null, combination: string | null) {
    // Finish the game
    // TODO: Implementar empate
    console.log('[Debug] Game #', this.id, 'finished.')

    this.status = GameStatus.FINISHED

    ServerManager.getConnection()
      ?.to(this.id)
      .emit(GameEvents.ON_GAME_WIN, {
        winner: winner?.toObject(),
        combination,
        game: this.toObject()
      } as GameFinishPayload)

    this.players.forEach(player => {
      player.getConnection().leave(this.id)
    })

    // Destroy this instance
  }

  public toObject(): GameObject {
    return {
      id: this.id,
      players: this.players.map(player => player.toObject()),
      status: this.getStatus(),
      turn: this.getTurn(),
      arena: this.arena?.toObject()
    }
  }
}
