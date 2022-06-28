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
import { GameEvents, Game, Player, ArenaPositions, Events } from 'dtos'

import styles from './styles.module.scss'
import { usePlayer } from '@hooks/usePlayer'

type IGameContext = {
  game: Game | null
  adversary: Player | null
  canPlay: boolean
  play: (pos: ArenaPositions) => void
}

const GameContext = createContext({} as IGameContext)

export const GameProvider: React.FC = ({ children }) => {
  const [game, setGame] = useState<Game | null>(null)
  const [canPlay, setCanPlay] = useState(false)

  const { connection, isConnected } = useConnection()
  const { setPlayer, player, token } = usePlayer()
  const router = useRouter()

  const adversary = useMemo(() => {
    return game?.players.find(p => p.id !== connection?.id)
  }, [game, connection])

  const play = (position: ArenaPositions) => {
    connection?.emit(
      Events.MAKE_PLAY,
      {
        name: player?.name,
        token,
        position
      },
      (error: string) => {
        if (error) {
          alert(error)
        }
      }
    )
  }

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

    connection!.on(GameEvents.ON_USER_PLAY, (game: Game) => {
      setGame(game)
    })
  }, [connection, isConnected, setPlayer, router])

  useEffect(() => {
    if (!game) return

    if (game.turn === player?.id && !canPlay) {
      setCanPlay(true)
    }

    if (game.turn !== player?.id && canPlay) {
      setCanPlay(false)
    }
  }, [game, canPlay, player])

  return (
    <GameContext.Provider
      value={{
        game,
        adversary: adversary || null,
        canPlay,
        play
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
