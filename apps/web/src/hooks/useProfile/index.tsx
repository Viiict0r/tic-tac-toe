/* eslint-disable valid-typeof */
import { useGame } from '@hooks/useGame'
import { Events } from '@utils/events'
import React, { createContext, useContext, useEffect, useState } from 'react'

type IProfileContext = {
  user: User | null
  logout: () => void
  setProfile: (user: User) => void
}

type User = {
  nickname: string
}

const ProfileContext = createContext({} as IProfileContext)

export const ProfileProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const { connection } = useGame()

  const handleUserProfile = (user: User) => {
    // Validate username
    setUser(user)
    window.localStorage.setItem('@tictactoe:user', JSON.stringify(user))
  }

  const disconnectUser = () => {
    if (!user) return

    connection?.emit(Events.LEAVE_LOBBY, user)

    setUser(null)
    window.localStorage.removeItem('@tictactoe:user')
  }

  useEffect(() => {
    const localStorage = window.localStorage.getItem('@tictactoe:user')

    if (localStorage) {
      const usr = JSON.parse(localStorage) as User
      setUser(usr)

      connection?.emit(Events.JOIN_LOBBY, usr, (error: string) => {
        if (error) {
          console.log(error)
        }
      })
    }
  }, [connection])

  return (
    <ProfileContext.Provider
      value={{ setProfile: handleUserProfile, logout: disconnectUser, user }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
