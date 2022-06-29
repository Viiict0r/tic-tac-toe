import React from 'react'
import { PlayerSide } from 'dtos'
import O from '../O'
import X from '../X'

import styles from './styles.module.scss'
import { Avatar, AvatarKey } from '@components/Avatar'

type Props = {
  username: string
  avatar: AvatarKey
  side?: PlayerSide | null
}

const PlayerAvatar: React.FC<Props> = ({ username, avatar, side = null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
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
