import { AvatarKey } from '@components/Avatar'
import { useGame } from '@hooks/useGame'
import { usePlayer } from '@hooks/usePlayer'
import cx from '@utils/cx'
import { Player } from 'dtos'
import React from 'react'
import PlayerAvatar from '../PlayerAvatar'

import styles from './styles.module.scss'

type Props = {
  state: 'win' | 'lose' | 'tie'
  winner?: Player | null
}

export const FinishScreen: React.FC<Props> = ({ state, winner = null }) => {
  const { player } = usePlayer()
  const { adversary } = useGame()

  return (
    <div
      className={cx([
        styles.container,
        state === 'lose' && styles.lose,
        state === 'win' && styles.win,
        state === 'tie' && styles.tie
      ])}
    >
      <div className={styles.blur}></div>
      <div className={cx([styles.wrapper])}>
        <PlayerAvatar
          username={player?.name || ''}
          avatar={(player?.avatar as AvatarKey) || 'avatar-batman'}
          showCrown={winner?.name === player?.name}
        />
        <div className={styles.vs}>
          <span>vs</span>
        </div>
        <PlayerAvatar
          username={adversary?.name || ''}
          avatar={(adversary?.avatar as AvatarKey) || 'avatar-batman'}
          showCrown={winner?.name === adversary?.name}
        />
        <div className={styles.title}>
          <h1>
            {state === 'win' && 'Você venceu!'}
            {state === 'lose' && 'Você perdeu'}
            {state === 'tie' && 'Empatou'}
          </h1>
        </div>
      </div>
    </div>
  )
}
