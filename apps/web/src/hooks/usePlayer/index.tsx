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
  logout: () => void
  connect: (data: Pick<Player, 'name' | 'token'>) => Promise<void>
}

const PlayerContext = createContext({} as IPlayerContext)
const STORAGE_KEY = '@tictactoe:player'

export const PlayerProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Player | null>(null)

  const { connection } = useConnection()

  const connectToLobby = useCallback(
    (player: Pick<Player, 'name' | 'token'>): Promise<void> =>
      new Promise((resolve, reject) => {
        connection?.emit(
          Events.ON_PLAYER_JOIN_LOBBY,
          player,
          (player?: Player, error?: string) => {
            if (!player && error) {
              reject(error)
            }

            setPlayer(player || null)
            resolve()
          }
        )
      }),
    [connection]
  )

  const handleUserConnect = async ({
    name,
    token
  }: Pick<Player, 'name' | 'token'>) => {
    await connectToLobby({ name, token })

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name, token } as Pick<Player, 'name' | 'token'>)
    )
  }

  const disconnectUser = () => {
    if (!player) return

    connection?.emit(Events.ON_PLAYER_LEAVE_LOBBY, player)

    setPlayer(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  useEffect(() => {
    const localStorage = window.localStorage.getItem(STORAGE_KEY)

    if (localStorage) {
      const usr = JSON.parse(localStorage) as Pick<Player, 'name' | 'token'>

      if (!usr.name || !usr.token) {
        window.localStorage.removeItem(STORAGE_KEY)
        return
      }

      connectToLobby(usr)
    }
  }, [connection, connectToLobby])

  return (
    <PlayerContext.Provider
      value={{ connect: handleUserConnect, logout: disconnectUser, player }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
