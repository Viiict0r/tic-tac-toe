import React, { useEffect } from 'react'

import {
  ArenaPositions,
  ArenaPositionValue,
  GameFinishReason,
  GameStatus
} from 'dtos'

import O from './O'
import X from './X'

import styles from './styles.module.scss'
import cx from '@utils/cx'
import { useGame } from '@hooks/useGame'
import { FinishScreen } from './FinishScreen'
import { usePlayer } from '@hooks/usePlayer'
import { toast } from 'react-toastify'

const positions: ArenaPositions[] = [
  'A1',
  'B1',
  'C1',
  'A2',
  'B2',
  'C2',
  'A3',
  'B3',
  'C3'
]

const Arena: React.FC = () => {
  const { game, canPlay, play, finishedPayload, adversary } = useGame()
  const { player } = usePlayer()

  const positionItem = (pos: ArenaPositions) => {
    const arenaPlays = game?.arena?.plays
    const win_combination = finishedPayload?.combination?.split('_')

    if (!arenaPlays || arenaPlays.length <= 0) {
      return null
    }

    const posValue = arenaPlays.find(play => play.position === pos)

    if (!posValue) return null

    if (posValue.value === ArenaPositionValue.O) {
      if (finishedPayload) {
        if (
          win_combination &&
          win_combination.find(pos => pos === posValue.position)
        ) {
          return <O green />
        }
        return <O disabled />
      }

      return <O />
    }

    if (posValue.value === ArenaPositionValue.X) {
      if (finishedPayload) {
        if (
          win_combination &&
          win_combination.find(pos => pos === posValue.position)
        ) {
          return <X green />
        }
        return <X disabled />
      }

      return <X />
    }

    return null
  }

  const handlePlay = (position: ArenaPositions) => {
    if (!canPlay) return

    play(position)
  }

  const gameResult = () => {
    if (finishedPayload) {
      if (finishedPayload.winner) {
        if (finishedPayload.winner.name === player?.name) {
          return 'win'
        }
        return 'lose'
      }

      return 'tie'
    }

    return null
  }

  useEffect(() => {
    if (game?.status !== GameStatus.FINISHED) return

    if (
      finishedPayload &&
      finishedPayload.reason === GameFinishReason.DISCONNECTED
    ) {
      toast.error(`${adversary?.name || '---'} desconectou`)
    }

    if (
      finishedPayload &&
      finishedPayload.reason === GameFinishReason.FORFEIT
    ) {
      toast.error(`${adversary?.name || '---'} desistiu`)
    }
  }, [adversary, finishedPayload, game])

  return (
    <>
      {game?.status === GameStatus.FINISHED && finishedPayload && (
        <FinishScreen
          state={gameResult() || 'tie'}
          winner={finishedPayload.winner}
        />
      )}
      <div className={styles.container}>
        <div
          className={cx([
            styles.win__delimiter__container,
            !finishedPayload && styles.hidden
          ])}
        >
          <div className={styles.win__delimiter}>
            <div
              className={cx([
                styles.win__delimiter___vertical,
                finishedPayload && finishedPayload.combination && styles.draw,
                finishedPayload?.combination &&
                  styles[finishedPayload.combination]
              ])}
            ></div>
            <div
              className={cx([
                styles.win__delimiter___horizontal,
                finishedPayload && finishedPayload.combination && styles.draw,
                finishedPayload?.combination &&
                  styles[finishedPayload.combination]
              ])}
            ></div>
          </div>
        </div>
        {positions.map(pos => (
          <div
            className={cx([styles.pos, !canPlay && styles.pos__disabled])}
            key={pos}
            onClick={() => handlePlay(pos)}
          >
            {positionItem(pos)}
          </div>
        ))}
      </div>
    </>
  )
}

export default Arena
