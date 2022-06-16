import Arena from '@components/Arena'
import React from 'react'

import styles from '@styles/Game/Game.module.scss'
import PlayerAvatar from '@components/Arena/PlayerAvatar'

const Game: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.players}>
          <PlayerAvatar />
          <div className={styles.vs}>
            <span>VS</span>
          </div>
          <PlayerAvatar />
        </div>
        <div className={styles.turn}>
          <span>É sua vez de jogar!</span>
        </div>
        <Arena />
      </div>
    </div>
  )
}

export default Game
