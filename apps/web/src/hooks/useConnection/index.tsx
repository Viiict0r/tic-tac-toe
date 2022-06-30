import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

type IConnectionContext = {
  connection: Socket | null
  isConnected: boolean
}

const ConnectionContext = createContext({} as IConnectionContext)

export const ConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Socket | null>(null)

  useEffect(() => {
    const connection = io(process.env.NEXT_PUBLIC_API_URL as string)

    setConnection(connection)
  }, [])

  return (
    <ConnectionContext.Provider
      value={{
        connection,
        isConnected: !!connection && connection.connected
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnection = () => useContext(ConnectionContext)
