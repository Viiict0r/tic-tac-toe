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
  connect: (nickname: string) => Promise<void>
}

const PlayerContext = createContext({} as IPlayerContext)
const STORAGE_KEY = '@tictactoe:player'

export const PlayerProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Player | null>(null)

  const { connection } = useConnection()

  const connectToLobby = useCallback(
    (player: Pick<Player, 'name'>): Promise<void> =>
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

  const handleUserConnect = async (nickname: string) => {
    await connectToLobby({ name: nickname })

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name: nickname } as Pick<Player, 'name'>)
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
      const usr = JSON.parse(localStorage) as Pick<Player, 'name'>

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
