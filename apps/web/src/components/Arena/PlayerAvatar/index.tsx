import React from 'react'
import X from '../X'

import styles from './styles.module.scss'

const PlayerAvatar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        <div className={styles.team}>
          <X />
        </div>
      </div>
      <div className={styles.nickname}>
        <span>Viiict0r</span>
      </div>
    </div>
  )
}

export default PlayerAvatar
