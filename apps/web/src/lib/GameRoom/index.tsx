import Arena from '@components/Arena'
import PlayerAvatar from '@components/Arena/PlayerAvatar'
import { AvatarKey } from '@components/Avatar'
import { Button } from '@components/Button'
import Logo from '@components/Logo'
import { useGame } from '@hooks/useGame'
import { usePlayer } from '@hooks/usePlayer'
import React from 'react'

import styles from './styles.module.scss'

const GameRoom: React.FC = () => {
  const { game, adversary, canPlay } = useGame()
  const { player } = usePlayer()

  return (
    <>
      <div className={styles.header}>
        <Logo />
      </div>
      <div className={styles.container}>
        <div className={styles.game_container}>
          <div className={styles.game_turn}>
            <span>É a vez de:</span>
            <b>{canPlay ? player?.name : adversary?.name}</b>
          </div>
          <div className={styles.player_wrapper}>
            <PlayerAvatar
              username={player?.name || ''}
              side={player?.side}
              avatar={(player?.avatar as AvatarKey) || 'avatar-batman'}
              disabled={!canPlay}
            />
          </div>
          <div className={styles.game_arena}>
            <Arena />
          </div>
          <div className={styles.player_wrapper}>
            <PlayerAvatar
              username={adversary?.name || ''}
              side={adversary?.side}
              avatar={(adversary?.avatar as AvatarKey) || 'avatar-batman'}
              disabled={canPlay}
            />
          </div>

          <div className={styles.game_footer}>
            <Button variant="danger">Desistir</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameRoom
