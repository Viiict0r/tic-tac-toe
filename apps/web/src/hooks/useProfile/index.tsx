/* eslint-disable valid-typeof */
import React, { createContext, useContext, useEffect, useState } from 'react'

type IProfileContext = {
  user: User | null
}

type User = {
  nickname: string
}

const ProfileContext = createContext({} as IProfileContext)

export const ProfileProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const handleUserProfile = (user: User) => {
    // Validate username
    setUser(user)
  }

  useEffect(() => {
    const localStorage = window.localStorage.getItem('@tictactoe:user')

    if (localStorage) {
      setUser(JSON.parse(localStorage))
    }
  }, [])

  return (
    <ProfileContext.Provider value={{ user }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
