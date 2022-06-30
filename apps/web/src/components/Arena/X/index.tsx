import cx from '@utils/cx'
import React from 'react'

import styles from './styles.module.scss'

type Props = {
  disabled?: boolean
  green?: boolean
}

const X: React.FC<Props> = ({ disabled = false, green = false }) => {
  return (
    <span
      className={cx([
        styles.x,
        disabled && styles.disabled,
        green && styles.win
      ])}
    >
      X
    </span>
  )
}

export default X
