import { Player } from "./Player"

export enum GameStatus {
  WAITING = 'waiting',
  STARTED = 'started',
  FINISHED = 'finished'
}

export enum ArenaPositionValue {
  X = 'x',
  O = 'o'
}

export type ArenaPositions = 'A1' | 'B1' | 'C1' |
                             'A2' | 'B2' | 'C2' |
                             'A3' | 'B3' | 'C3'

export type ArenaPlay = {
  position: ArenaPositions
  value: ArenaPositionValue
  playerToken: string
}

export type Arena = {
  plays: ArenaPlay[]
}

export type Game = {
  id: string
  status: GameStatus
  players: Player[]
  arena?: Arena
  turn: string
  timeToPlay: number
}

export type GameFinishPayload = {
  winner?: Player
  combination?: string
  game: Game
  reason: GameFinishReason
}

export enum GameFinishReason {
  DISCONNECTED = 'disconnected',
  FORFEIT = 'forfeit',
  GAME_WIN = 'game_win',
  GAME_TIED = 'tied_game'
}
