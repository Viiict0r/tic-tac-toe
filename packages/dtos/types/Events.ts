/* eslint-disable no-unused-vars */
export enum Events {
  ON_PLAYER_JOIN_LOBBY = 'join_lobby',
  ON_PLAYER_LEAVE_LOBBY = 'leave_lobby',
  ON_PLAYER_DISCONNECT = 'disconnect',
  ON_PLAYER_SEARCH_MATCH = 'search_match',
  MAKE_PLAY = 'make_play'
}

export enum GameEvents {
  ON_GAME_START = 'game_start',
  ON_MATCH_FIND = 'match_find',
  ON_USER_PLAY = 'user_play',
  ON_GAME_FINISH = 'game_finish',
  ON_PLAY_TIMEOUT = 'play_timeout',
  ON_TIME_PLAY_COUNT = 'time_play_count'
}
