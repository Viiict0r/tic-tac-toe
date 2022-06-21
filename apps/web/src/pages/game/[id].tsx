import Arena from '@components/Arena'
import React from 'react'

import styles from '@styles/Game/Game.module.scss'
import PlayerAvatar from '@components/Arena/PlayerAvatar'
import { useGame } from '@hooks/useGame'
import { useProfile } from '@hooks/useProfile'

const Game: React.FC = () => {
  const { game, connection } = useGame()
  const { user } = useProfile()

  // TODO: Validate game room id and players

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.players}>
          <PlayerAvatar username={user?.nickname || ''} />
          <div className={styles.vs}>
            <span>VS</span>
          </div>
          <PlayerAvatar username={game?.adversary?.name || ''} />
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
