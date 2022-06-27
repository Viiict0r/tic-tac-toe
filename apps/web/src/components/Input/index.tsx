import cx from '@utils/cx'
import React, { InputHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
  error?: string | null
}

export const Input: React.FC<Props> = ({
  error,
  hasError = false,
  className,
  ...props
}) => {
  return (
    <div className={cx([styles.input_wrapper, className && className])}>
      <input
        className={cx([styles.input, hasError && styles.error])}
        {...props}
      />
      {!!error && <span className={styles.error_msg}>{error}</span>}
    </div>
  )
}
