import React, { InputHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = ({ ...props }) => {
  return <input className={styles.input} {...props} />
}
