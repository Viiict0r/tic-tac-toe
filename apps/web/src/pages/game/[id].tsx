import Arena from '@components/Arena'
import React from 'react'

import styles from '@styles/Game/Game.module.scss'
import PlayerAvatar from '@components/Arena/PlayerAvatar'
import { useGame } from '@hooks/useGame'
import { usePlayer } from '@hooks/usePlayer'

const Game: React.FC = () => {
  const { game, adversary } = useGame()
  const { player } = usePlayer()

  // TODO: Validate game room id and players

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.players}>
          <PlayerAvatar username={player?.name || ''} side={player?.side} />
          <div className={styles.vs}>
            <span>VS</span>
          </div>
          <PlayerAvatar
            username={adversary?.name || ''}
            side={adversary?.side}
          />
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
