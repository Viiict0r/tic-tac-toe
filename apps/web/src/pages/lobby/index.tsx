/* eslint-disable no-unused-vars */
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import styles from '@styles/Lobby/Lobby.module.scss'
import { usePlayer } from '@hooks/usePlayer'
import Logo from '@components/Logo'
import { Button } from '@components/Button'
import Router from 'next/router'
import PlayerAvatar from '@components/Arena/PlayerAvatar'
import Spinner from '@components/Spinner'
import { useGame } from '@hooks/useGame'
import { Events } from 'dtos'
import { useConnection } from '@hooks/useConnection'
import { AvatarKey } from '@components/Avatar'

enum ScreenState {
  NORMAL = 'normal',
  SEARCHING = 'searching',
  ADVERSARY_FINDED = 'match_finded'
}

const Lobby: NextPage = () => {
  const [state, setState] = useState<ScreenState>(ScreenState.NORMAL)
  const [actionLoading, setActionLoading] = useState(false)

  const { player, logout } = usePlayer()
  const { adversary } = useGame()
  const { connection } = useConnection()

  const handleUserLeave = () => {
    logout()
  }

  const handleSearch = () => {
    // Handle user search
    setActionLoading(true)

    connection?.emit(
      Events.ON_PLAYER_SEARCH_MATCH,
      { name: player?.name, action: 'enter' },
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
      Events.ON_PLAYER_SEARCH_MATCH,
      { name: player?.name, action: 'leave' },
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
    if (!player) {
      Router.push('/')
    }
  }, [player])

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
                  Bem vindo(a) <b>{player?.name}</b>!
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
                <PlayerAvatar
                  avatar={(player?.avatar as AvatarKey) || 'avatar-batman'}
                  username={player?.name || ''}
                  side={player?.side}
                />
              </div>
              <div className={styles.separator_vs}>
                <span>VS</span>
              </div>
              <div className={styles.avatar}>
                <PlayerAvatar
                  avatar={(adversary?.avatar as AvatarKey) || 'avatar-batman'}
                  username={adversary?.name || ''}
                  side={adversary?.side}
                />
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
                <PlayerAvatar
                  avatar={(player?.avatar as AvatarKey) || 'avatar-batman'}
                  username={player?.name || ''}
                />
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
