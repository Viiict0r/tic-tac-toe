import { v4 as uuid } from 'uuid'
import ServerManager from '@core/server-manager'
import { Player, PlayerObject } from './Player'
import { GameEvents } from '@utils/events'

export enum GameStatus {
  WAITING = 'waiting',
  STARTED = 'started'
}

export type GameObject = {
  id: string
  players: PlayerObject[]
  status: GameStatus
}

export class Game {
  private readonly id: string
  private players: Player[]
  private status: GameStatus

  constructor(players: Player[]) {
    this.id = uuid()
    this.players = players
    this.status = GameStatus.WAITING
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

  public start() {
    // Start game

    console.log('[Debug] Game #', this.id, 'started.')

    ServerManager.getConnection()
      ?.to(this.getId())
      .emit(GameEvents.ON_GAME_START, this.toObject())
  }

  public makePlay() {
    // TODO: Implement user play action
  }

  public toObject(): GameObject {
    return {
      id: this.id,
      players: this.players.map(player => player.toObject()),
      status: this.getStatus()
    }
  }
}
