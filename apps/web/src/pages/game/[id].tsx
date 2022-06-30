import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGame } from '@hooks/useGame'

import GameRoom from '@lib/GameRoom'
import { usePlayer } from '@hooks/usePlayer'

const Game: React.FC = () => {
  const router = useRouter()
  const { game, adversary } = useGame()
  const { player } = usePlayer()

  const { id: gameId } = router.query

  useEffect(() => {
    if (!game || game.id !== gameId) {
      router.push('/')
    }
  }, [game, gameId, router])

  // TODO: Validate game room id and players

  return (
    <>
      <Head>
        <title>
          {player?.name} vs {adversary?.name} | Tic Tac Toe
        </title>
      </Head>
      <div className="container">
        <GameRoom />
      </div>
    </>
  )
}

export default Game
