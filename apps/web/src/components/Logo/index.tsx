import React from 'react'

import styles from './styles.module.scss'

const Logo: React.FC = () => {
  return (
    <div className={styles.logo__wrapper}>
      <span>X</span>
      <span>O</span>
      <span>X</span>
      <span>O</span>
    </div>
  )
}

export default Logo
