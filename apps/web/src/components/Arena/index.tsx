import React from 'react'
import { ArenaPositions, ArenaPositionValue } from 'dtos'

import O from './O'
import X from './X'

import styles from './styles.module.scss'
import cx from '@utils/cx'
import { useGame } from '@hooks/useGame'

const positions: ArenaPositions[] = [
  'A1',
  'B1',
  'C1',
  'A2',
  'B2',
  'C2',
  'A3',
  'B3',
  'C3'
]

const Arena: React.FC = () => {
  const { game, canPlay, play } = useGame()

  const positionItem = (pos: ArenaPositions) => {
    const arenaPlays = game?.arena?.plays

    if (!arenaPlays || arenaPlays.length <= 0) {
      return null
    }

    const posValue = arenaPlays.find(play => play.position === pos)

    if (!posValue) return null

    if (posValue.value === ArenaPositionValue.O) {
      return <O />
    }

    if (posValue.value === ArenaPositionValue.X) {
      return <X />
    }

    return null
  }

  const handlePlay = (position: ArenaPositions) => {
    if (!canPlay) return

    play(position)
  }

  return (
    <div className={styles.container}>
      {positions.map(pos => (
        <div
          className={cx([styles.pos, !canPlay && styles.pos__disabled])}
          key={pos}
          onClick={() => handlePlay(pos)}
        >
          {positionItem(pos)}
        </div>
      ))}
    </div>
  )
}

export default Arena
