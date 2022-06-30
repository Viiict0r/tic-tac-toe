import React from 'react'
import { PlayerSide } from 'dtos'
import O from '../O'
import X from '../X'

import Crown from '@assets/crown.svg'

import styles from './styles.module.scss'
import { Avatar, AvatarKey } from '@components/Avatar'
import cx from '@utils/cx'

type Props = {
  username: string
  avatar: AvatarKey
  side?: PlayerSide | null
  disabled?: boolean
  showCrown?: boolean
}

const PlayerAvatar: React.FC<Props> = ({
  username,
  avatar,
  side = null,
  disabled = false,
  showCrown = false
}) => {
  return (
    <div className={cx([styles.container, disabled && styles.disabled])}>
      {showCrown && (
        <div className={styles.crown}>
          <Crown />
        </div>
      )}
      <div className={cx([styles.photo, showCrown && styles.winner])}>
        <Avatar avatarKey={avatar} />
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
