import { Socket } from 'socket.io'
import { PlayerSide, PlayerStatus, Player as PlayerObject } from 'dtos'
import GameManager from '@core/game/game-manager'

export class Player {
  private readonly id: string
  private readonly name: string
  private readonly connection: Socket
  private readonly token: string
  private side: PlayerSide | null
  private status: PlayerStatus
  private canPlay: boolean
  private currentGameId: string | null

  constructor(name: string, id: string, connection: Socket, token: string) {
    this.name = name
    this.canPlay = false
    this.currentGameId = null
    this.id = id
    this.connection = connection
    this.status = PlayerStatus.AWAY
    this.side = null
    this.token = token
  }

  public userCanPlay() {
    return this.canPlay
  }

  public getUserId() {
    /** Return user socket connection id */
    return this.id
  }

  public getCurrentGame() {
    return GameManager.getAllCurrentGames().find(
      game => game.getId() === this.currentGameId
    )
  }

  public setCurrentGame(gameId: string) {
    this.currentGameId = gameId
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

  public getToken() {
    return this.token
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
      side: this.side,
      token: 'secret'
    }
  }
}
