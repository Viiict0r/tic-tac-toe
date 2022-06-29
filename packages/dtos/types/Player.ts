export enum PlayerStatus {
  IN_GAME = 'in_game',
  SEARCHING = 'searching',
  AWAY = 'away'
}

export enum PlayerSide {
  X = 'side_x',
  O = 'side_o'
}

export type Player = {
  id: string
  name: string
  avatar: string
  side: PlayerSide | null
  token: string
}
