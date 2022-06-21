import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import Logo from '@components/Logo'
import Spinner from '@components/Spinner'
import { GameEvents } from '@utils/events'

import styles from './styles.module.scss'
import { Game, GameStatus, PlayerSide } from './types'

type IGameContext = {
  connection: Socket | null
  game: Game | null
  side: PlayerSide | null
}

const GameContext = createContext({} as IGameContext)

export const GameProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Socket | null>(null)
  const [game, setGame] = useState<Game | null>(null)
  const [side, setSide] = useState<PlayerSide | null>(null)

  useEffect(() => {
    const connection = io('localhost:3333')

    setTimeout(() => {
      setConnection(connection)
    }, 1500)
  }, [])

  useEffect(() => {
    /** Game events handler */
    if (!connection) return

    connection.on(
      GameEvents.ON_MATCH_FIND,
      (game: Pick<Game, 'id' | 'players'>) => {
        setGame({
          id: game.id,
          players: game.players,
          status: GameStatus.WAITING,
          adversary: game.players.find(p => p.id !== connection.id) || null
        })
      }
    )

    connection.on(
      GameEvents.ON_GAME_START,
      (game: Pick<Game, 'id' | 'players' | 'status'>) => {
        const side =
          game.players.find(p => p.id === connection.id)?.side || null

        setSide(side)

        setGame({
          id: game.id,
          players: game.players,
          status: GameStatus.STARTED,
          adversary: game.players.find(p => p.id !== connection.id) || null
        })
      }
    )
  }, [connection])

  return (
    <GameContext.Provider
      value={{
        connection,
        game,
        side
      }}
    >
      {!connection || !connection?.active ? (
        <div className={styles.loading_container}>
          <Logo />
          <Spinner size={40} color="#FFD460" />
        </div>
      ) : (
        children
      )}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
