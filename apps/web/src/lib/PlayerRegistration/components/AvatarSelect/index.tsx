import React, { useEffect, useState } from 'react'

import { AvatarKey, Avatar } from '@components/Avatar'

import styles from './styles.module.scss'
import cx from '@utils/cx'

type Props = {
  selected?: boolean
  onSelect?: () => void
  avatarKey: AvatarKey
  errored?: boolean
}

export const AvatarSelect = ({
  avatarKey,
  selected = false,
  errored = false,
  onSelect = () => null
}: Props) => {
  const [isSelected, setSelected] = useState(selected)

  useEffect(() => {
    setSelected(selected)
  }, [selected])

  const handleSelect = () => {
    if (isSelected) return

    setSelected(true)
    onSelect()
  }

  return (
    <div
      className={cx([
        styles.container,
        isSelected && styles.selected,
        errored && styles.errored
      ])}
      onClick={handleSelect}
    >
      <Avatar avatarKey={avatarKey} />
    </div>
  )
}
