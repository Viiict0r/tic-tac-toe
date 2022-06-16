import Spinner from '@components/Spinner'
import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'small' | 'big'
  loading?: boolean
  disabled?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  size = 'small',
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${styles.button__base} ${styles[`button__${size}`]} ${
        loading ? styles.loading : ''
      }`}
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
