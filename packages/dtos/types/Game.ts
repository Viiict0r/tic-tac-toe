import { Player } from "./Player"

export enum GameStatus {
  WAITING = 'waiting',
  STARTED = 'started'
}

export enum ArenaPositionValue {
  EMPTY = 'empty',
  X = 'x',
  O = 'o'
}

export type ArenaPositions = 'A1' | 'B1' | 'C1' |
                             'A2' | 'B2' | 'C2' |
                             'A3' | 'B3' | 'C3'

export type Arena = {
  positions: {
    [K in ArenaPositions]: ArenaPositionValue
  }
}

export type Game = {
  id: string
  status: GameStatus
  players: Player[]
  arena?: Arena
}
