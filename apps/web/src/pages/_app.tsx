import React from 'react'

import { AppProps } from 'next/app'
import { GameProvider } from '@hooks/useGame'
import { PlayerProvider } from '@hooks/usePlayer'
import { ConnectionProvider } from '@hooks/useConnection'

import '../styles/global.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ConnectionProvider>
      <PlayerProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </PlayerProvider>
    </ConnectionProvider>
  )
}

export default App
