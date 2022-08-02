import Arena from '@components/Arena'
import PlayerAvatar from '@components/Arena/PlayerAvatar'
import { AvatarKey } from '@components/Avatar'
import Logo from '@components/Logo'
import { useGame } from '@hooks/useGame'
import { usePlayer } from '@hooks/usePlayer'
import cx from '@utils/cx'
import React from 'react'

import styles from './styles.module.scss'

const GameRoom: React.FC = () => {
  const { adversary, canPlay, game } = useGame()
  const { player } = usePlayer()

  return (
    <>
      <div className={styles.header}>
        <Logo />
      </div>
      <div className={styles.container}>
        <div className={styles.mobile_players}>
          <div>
            <PlayerAvatar
              username={player?.name || ''}
              side={player?.side}
              avatar={(player?.avatar as AvatarKey) || 'avatar-batman'}
              disabled={!canPlay}
            />
          </div>

          <div className={styles.vs}>
            <span>VS</span>
          </div>

          <div>
            <PlayerAvatar
              username={adversary?.name || ''}
              side={adversary?.side}
              avatar={(adversary?.avatar as AvatarKey) || 'avatar-batman'}
              disabled={canPlay}
            />
          </div>
        </div>
        <div className={styles.game_container}>
          <div className={styles.game_turn}>
            {!!canPlay && (
              <div className={styles.my_turn}>
                <span>É sua vez de jogar!</span>
              </div>
            )}

            {!canPlay && (
              <div>
                <span>É a vez de:</span>
                <b>{canPlay ? player?.name : adversary?.name}</b>
              </div>
            )}
            <div className={styles.divider}></div>
            <div>
              <span>TEMPO PARA JOGAR:</span>
              <b
                className={cx([
                  !!game?.timeToPlay &&
                    game.timeToPlay <= 10 &&
                    styles.timer_red,
                  !game?.timeToPlay && styles.timer_red
                ])}
              >
                00:{String(game?.timeToPlay).padStart(2, '0')}
              </b>
            </div>
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
            {/* <Button variant="danger">Desistir</Button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default GameRoom
