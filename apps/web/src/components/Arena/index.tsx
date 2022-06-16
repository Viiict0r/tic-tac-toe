import React from 'react'
import O from './O'

import styles from './styles.module.scss'
import X from './X'

const Arena: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <X />
      </div>
      <div>
        <O />
      </div>
      <div>
        <X />
      </div>
      <div>
        <O />
      </div>
      <div>
        <X />
      </div>
      <div>
        <O />
      </div>
      <div>
        <X />
      </div>
      <div>
        <O />
      </div>
      <div>
        <O />
      </div>
    </div>
  )
}

export default Arena
