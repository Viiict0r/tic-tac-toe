/* eslint-disable valid-typeof */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'

import { Events, Player } from 'dtos'
import { useConnection } from '@hooks/useConnection'

type IPlayerContext = {
  player: Player | null
  token: string
  setPlayer: (player: Player) => void
  logout: () => void
  connect: (data: Pick<Player, 'name' | 'token' | 'avatar'>) => Promise<void>
}

const PlayerContext = createContext({} as IPlayerContext)
const STORAGE_KEY = '@tictactoe:player'

export const PlayerProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Player | null>(null)
  const [token, setToken] = useState('')

  const { connection } = useConnection()

  const connectToLobby = useCallback(
    (paramPlayer: Pick<Player, 'name' | 'token' | 'avatar'>): Promise<void> =>
      new Promise((resolve, reject) => {
        connection?.emit(
          Events.ON_PLAYER_JOIN_LOBBY,
          paramPlayer,
          (player?: Player, error?: string) => {
            if (!player && error) {
              reject(error)
            }

            setPlayer(player || null)
            setToken(paramPlayer.token)
            resolve()
          }
        )
      }),
    [connection]
  )

  const handleUserConnect = async ({
    name,
    token,
    avatar
  }: Pick<Player, 'name' | 'token' | 'avatar'>) => {
    await connectToLobby({ name, avatar, token })

    setToken(token)
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name, token, avatar } as Pick<
        Player,
        'name' | 'token' | 'avatar'
      >)
    )
  }

  const disconnectUser = () => {
    if (!player) return

    connection?.emit(Events.ON_PLAYER_LEAVE_LOBBY, player)

    setPlayer(null)
    setToken('')
    window.localStorage.removeItem(STORAGE_KEY)
  }

  useEffect(() => {
    const localStorage = window.localStorage.getItem(STORAGE_KEY)

    if (localStorage) {
      const usr = JSON.parse(localStorage) as Pick<
        Player,
        'name' | 'token' | 'avatar'
      >

      if (!usr.name || !usr.token) {
        window.localStorage.removeItem(STORAGE_KEY)
        return
      }

      connectToLobby(usr)
    }
  }, [connection, connectToLobby])

  return (
    <PlayerContext.Provider
      value={{
        connect: handleUserConnect,
        logout: disconnectUser,
        player,
        setPlayer,
        token
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
