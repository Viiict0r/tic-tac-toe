import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Arena from '@components/Arena'
import PlayerAvatar from '@components/Arena/PlayerAvatar'
import { useGame } from '@hooks/useGame'
import { usePlayer } from '@hooks/usePlayer'

import styles from '@styles/Game/Game.module.scss'

const Game: React.FC = () => {
  const router = useRouter()
  const { game, adversary } = useGame()
  const { player } = usePlayer()

  const { id: gameId } = router.query

  useEffect(() => {
    if (!game || game.id !== gameId) {
      router.push('/')
    }
  }, [game, gameId, router])

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
