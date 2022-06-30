import Spinner from '@components/Spinner'
import cx from '@utils/cx'
import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'small' | 'big'
  variant?: 'default' | 'danger'
  loading?: boolean
  disabled?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  size = 'small',
  variant = 'default',
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={cx([
        styles.button__base,
        styles[`button__${size}`],
        styles[`button__variant__${variant}`],
        loading && styles.loading
      ])}
      {...rest}
    >
      {children}
      {loading && (
        <div className={styles.button__loading_spinner}>
          <Spinner size={20} />
        </div>
      )}
    </button>
  )
}
