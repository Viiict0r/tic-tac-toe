import { PlayerSide } from '@hooks/useGame/types'
import React from 'react'
import O from '../O'
import X from '../X'

import styles from './styles.module.scss'

type Props = {
  username: string
  side?: PlayerSide | null
}

const PlayerAvatar: React.FC<Props> = ({ username, side = null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        {!!side && (
          <div className={styles.team}>
            {side === PlayerSide.X ? <X /> : <O />}
          </div>
        )}
      </div>
      <div className={styles.nickname}>
        <span>{username}</span>
      </div>
    </div>
  )
}

export default PlayerAvatar
