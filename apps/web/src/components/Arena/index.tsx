import React from 'react'
import { ArenaPositions } from 'dtos'

import O from './O'
import X from './X'

import styles from './styles.module.scss'

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
  const positionItem = (pos: ArenaPositions) => {
    return null
  }

  return (
    <div className={styles.container}>
      {positions.map(pos => (
        <div className={styles.pos} key={pos}>
          {positionItem(pos)}
        </div>
      ))}
    </div>
  )
}

export default Arena
