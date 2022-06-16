import React from 'react'

import styles from './styles.module.scss'

type Props = {
  color?: string
  size: number
}

const Spinner: React.FC<Props> = ({ size, color = '#fff' }) => {
  return (
    <span
      className={styles.loader}
      style={{
        borderTop: `2px solid ${color}`,
        width: `${size}px`,
        height: `${size}px`
      }}
    ></span>
  )
}

export default Spinner
