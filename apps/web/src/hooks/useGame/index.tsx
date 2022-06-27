import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo
} from 'react'

import { useRouter } from 'next/router'

import Logo from '@components/Logo'
import Spinner from '@components/Spinner'
import { useConnection } from '@hooks/useConnection'
import { GameEvents, Game, Player } from 'dtos'

import styles from './styles.module.scss'
import { usePlayer } from '@hooks/usePlayer'

type IGameContext = {
  game: Game | null
  adversary: Player | null
}

const GameContext = createContext({} as IGameContext)

export const GameProvider: React.FC = ({ children }) => {
  const [game, setGame] = useState<Game | null>(null)

  const { connection, isConnected } = useConnection()
  const { setPlayer } = usePlayer()
  const router = useRouter()

  const adversary = useMemo(() => {
    return game?.players.find(p => p.id !== connection?.id)
  }, [game, connection])

  useEffect(() => {
    /** Game events handler */
    if (!isConnected) return

    connection!.on(GameEvents.ON_MATCH_FIND, (game: Game) => {
      setGame(game)

      const self = game.players.find(p => p.id === connection?.id)

      setPlayer(self!)
    })

    connection!.on(GameEvents.ON_GAME_START, (game: Game) => {
      setGame(game)

      router.push(`/game/${game.id}`)
    })
  }, [connection, isConnected, setPlayer, router])

  return (
    <GameContext.Provider
      value={{
        game,
        adversary: adversary || null
      }}
    >
      {!connection || !connection?.active ? (
        <div className={styles.loading_container}>
          <Logo />
          <Spinner size={40} color="#FFD460" />
        </div>
      ) : (
        children
      )}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
