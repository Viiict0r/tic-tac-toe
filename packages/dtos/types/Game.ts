import { Player } from "./Player"

export enum GameStatus {
  WAITING = 'waiting',
  STARTED = 'started'
}

export type Game = {
  id: string
  status: GameStatus
  players: Player[]
}
