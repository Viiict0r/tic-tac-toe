/* eslint-disable no-unused-vars */
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
import { GameStatus } from '@hooks/useGame/types'

enum ScreenState {
  NORMAL = 'normal',
  SEARCHING = 'searching',
  ADVERSARY_FINDED = 'match_finded'
}

const Lobby: NextPage = () => {
  const [state, setState] = useState<ScreenState>(ScreenState.NORMAL)
  const [actionLoading, setActionLoading] = useState(false)

  const { user, logout } = useProfile()
  const { connection, game } = useGame()

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

  useEffect(() => {
    if (game !== null && game.adversary && game.status === GameStatus.WAITING) {
      setState(ScreenState.ADVERSARY_FINDED)
    }

    if (game !== null && game.adversary && game.status === GameStatus.STARTED) {
      Router.push(`/game/${game.id}`)
    }
  }, [game])

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.wrapper_content}>
          <Logo />
          <div className={styles.welcome__text}>
            <span>
              {state === ScreenState.ADVERSARY_FINDED ? (
                'Adversário encontrado!'
              ) : (
                <>
                  Bem vindo(a) <b>{user?.nickname}</b>!
                </>
              )}
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

          {state === ScreenState.ADVERSARY_FINDED && (
            <div className={styles.searching_wrapper}>
              <div className={styles.avatar}>
                <PlayerAvatar username={user?.nickname || ''} />
              </div>
              <div className={styles.separator_vs}>
                <span>VS</span>
              </div>
              <div className={styles.avatar}>
                <PlayerAvatar username={game?.adversary?.name || ''} />
              </div>
              <div className={styles.cancel}>
                <span>
                  Iniciando partida<b>...</b>
                </span>
              </div>
            </div>
          )}

          {state === ScreenState.SEARCHING && (
            <div className={styles.searching_wrapper}>
              <div className={styles.avatar}>
                <PlayerAvatar username={user?.nickname || ''} />
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
