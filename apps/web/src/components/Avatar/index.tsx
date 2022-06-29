import React from 'react'

import AvatarActorChaplin from '@assets/avatars/actor-chaplin-comedy.svg'
import AvatarBatman from '@assets/avatars/avatar-batman-comics.svg'
import AvatarCloudCrying from '@assets/avatars/avatar-cloud-crying.svg'
import AvatarMuslim from '@assets/avatars/avatar-muslim.svg'
import AvatarMaleManOld from '@assets/avatars/male-man-old.svg'

import styles from './styles.module.scss'

export type AvatarKey =
  | 'actor-chaplin'
  | 'avatar-batman'
  | 'avatar-cloud-crying'
  | 'avatar-muslim'
  | 'male-man-old'

type Props = {
  avatarKey: AvatarKey
}

export const Avatar = ({ avatarKey }: Props) => {
  const getSVGFromKey = () => {
    switch (avatarKey) {
      case 'actor-chaplin':
        return <AvatarActorChaplin />
      case 'avatar-batman':
        return <AvatarBatman />
      case 'avatar-cloud-crying':
        return <AvatarCloudCrying />
      case 'avatar-muslim':
        return <AvatarMuslim />
      case 'male-man-old':
        return <AvatarMaleManOld />
      default:
        return null
    }
  }

  return <div className={styles.avatar}>{getSVGFromKey()}</div>
}
