import { Socket } from 'socket.io'
import { Game } from './Game'

export enum PlayerStatus {
  IN_GAME = 'in_game',
  SEARCHING = 'searching',
  AWAY = 'away'
}

export enum PlayerSide {
  X = 'side_x',
  O = 'side_o'
}

export type PlayerObject = {
  id: string
  name: string
  side: PlayerSide | null
}

export class Player {
  private readonly id: string
  private readonly name: string
  private readonly connection: Socket
  private side: PlayerSide | null
  private status: PlayerStatus
  private canPlay: boolean
  private game: Game | null

  constructor(name: string, id: string, connection: Socket) {
    this.name = name
    this.canPlay = false
    this.game = null
    this.id = id
    this.connection = connection
    this.status = PlayerStatus.AWAY
    this.side = null
  }

  public userCanPlay() {
    return this.canPlay
  }

  public getUserId() {
    /** Return user socket connection id */
    return this.id
  }

  public getCurrentGame() {
    return this.game
  }

  public getStatus() {
    return this.status
  }

  public setStatus(status: PlayerStatus) {
    this.status = status
  }

  public getConnection() {
    return this.connection
  }

  public getUsername() {
    return this.name
  }

  public getSide() {
    return this.side
  }

  public setSide(side: PlayerSide) {
    this.side = side
  }

  public toObject(): PlayerObject {
    return {
      id: this.id,
      name: this.name,
      side: this.side
    }
  }
}
