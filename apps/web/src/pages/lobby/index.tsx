import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import styles from '@styles/Lobby/Lobby.module.scss'
import { useProfile } from '@hooks/useProfile'
import Logo from '@components/Logo'
import { Button } from '@components/Button'
import Router from 'next/router'
import PlayerAvatar from '@components/Arena/PlayerAvatar'
import Spinner from '@components/Spinner'
import { useGame } from '@hooks/useGame'
import { Events } from '@utils/events'

enum ScreenState {
  NORMAL = 'normal',
  SEARCHING = 'searching'
}

const Lobby: NextPage = () => {
  const [state, setState] = useState<ScreenState>(ScreenState.NORMAL)
  const [actionLoading, setActionLoading] = useState(false)

  const { user, logout } = useProfile()
  const { connection } = useGame()

  const handleUserLeave = () => {
    logout()
  }

  const handleSearch = () => {
    // Handle user search
    setActionLoading(true)

    connection?.emit(
      Events.SEARCH_MATCH,
      { nickname: user?.nickname, action: 'enter' },
      (error: string) => {
        if (error) {
          alert(error)
          return
        }

        setState(ScreenState.SEARCHING)
        setActionLoading(false)
      }
    )
  }

  const handleCancelSearch = () => {
    // Handle cancel search
    setActionLoading(true)

    connection?.emit(
      Events.SEARCH_MATCH,
      { nickname: user?.nickname, action: 'leave' },
      (error: string) => {
        if (error) {
          alert(error)
          return
        }

        setState(ScreenState.NORMAL)
        setActionLoading(false)
      }
    )
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
          {state === ScreenState.NORMAL && (
            <div className={styles.action_wrapper}>
              <Button size="big" onClick={handleSearch}>
                Jogar
              </Button>
              <Button
                size="big"
                onClick={handleUserLeave}
                disabled={actionLoading}
                loading={actionLoading}
              >
                Sair
              </Button>
            </div>
          )}

          {state === ScreenState.SEARCHING && (
            <div className={styles.searching_wrapper}>
              <div className={styles.avatar}>
                <PlayerAvatar />
              </div>
              <div className={styles.separator}></div>
              <div className={styles.searching}>
                <Spinner size={25} />
                <span>
                  Procurando por um
                  <br />
                  adversário...
                </span>
              </div>
              <div className={styles.cancel}>
                <Button
                  onClick={handleCancelSearch}
                  disabled={actionLoading}
                  loading={actionLoading}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lobby
