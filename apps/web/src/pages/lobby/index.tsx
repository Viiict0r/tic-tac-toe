import { NextPage } from 'next'
import React, { useEffect } from 'react'

import styles from '@styles/Lobby/Lobby.module.scss'
import { useProfile } from '@hooks/useProfile'
import Logo from '@components/Logo'
import { Button } from '@components/Button'
import Router from 'next/router'

const Lobby: NextPage = () => {
  const { user, logout } = useProfile()

  const handleUserLeave = () => {
    logout()
  }

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.wrapper_content}>
          <Logo />
          <div className={styles.welcome__text}>
            <span>
              Bem vindo(a) <b>{user?.nickname}</b>!
            </span>
          </div>
          <div className={styles.action_wrapper}>
            <Button size="big">Player vs Player</Button>
            <Button size="big" onClick={handleUserLeave}>
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lobby
