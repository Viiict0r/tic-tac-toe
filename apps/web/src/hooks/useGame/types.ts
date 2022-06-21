/* eslint-disable no-unused-vars */
// ! TODO: Turn types in global package application and use same types on back-end and front-end

export enum PlayerSide {
  X = 'side_x',
  O = 'side_o'
}

export enum GameStatus {
  WAITING = 'waiting',
  STARTED = 'started'
}

export type Player = {
  id: string
  name: string
  side: PlayerSide | null
}

export type Game = {
  id: string
  players: Player[]
  adversary: Player | null
  status: GameStatus
}
