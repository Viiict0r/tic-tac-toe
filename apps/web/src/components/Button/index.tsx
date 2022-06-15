import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  )
}
