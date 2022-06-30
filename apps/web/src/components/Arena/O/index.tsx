import React from 'react'
import cx from '@utils/cx'

import styles from './styles.module.scss'

type Props = {
  disabled?: boolean
  green?: boolean
}

const O: React.FC<Props> = ({ disabled = false, green = false }) => {
  return (
    <span
      className={cx([
        styles.o,
        disabled && styles.disabled,
        green && styles.win
      ])}
    >
      O
    </span>
  )
}

export default O
