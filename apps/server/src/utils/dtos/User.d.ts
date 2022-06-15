export enum UserStatus {
  INGAME = 'ingame',
  AWAY = 'away',
  SEARCHING = 'searching'
}

export type User = {
  id: string
  nickname: string
  status: UserStatus
}
