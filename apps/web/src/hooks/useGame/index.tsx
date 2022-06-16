import Logo from '@components/Logo'
import Spinner from '@components/Spinner'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import styles from './styles.module.scss'

type IGameContext = {
  connection: Socket | null
}

const GameContext = createContext({} as IGameContext)

export const GameProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Socket | null>(null)

  useEffect(() => {
    const connection = io('localhost:3333')

    setTimeout(() => {
      setConnection(connection)
    }, 1500)
  }, [])

  return (
    <GameContext.Provider
      value={{
        connection
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
