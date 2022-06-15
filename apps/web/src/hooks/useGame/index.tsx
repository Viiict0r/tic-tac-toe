import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type IGameContext = {
  connection: Socket | null
}

const GameContext = createContext({} as IGameContext)

export const GameProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Socket | null>(null)

  useEffect(() => {
    const connection = io('localhost:3333')

    setConnection(connection)
  }, [])

  return (
    <GameContext.Provider
      value={{
        connection
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
