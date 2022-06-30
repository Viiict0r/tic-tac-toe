import React from 'react'
import Head from 'next/head'

import { AppProps } from 'next/app'
import { GameProvider } from '@hooks/useGame'
import { PlayerProvider } from '@hooks/usePlayer'
import { ConnectionProvider } from '@hooks/useConnection'

import '../styles/global.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <ConnectionProvider>
        <PlayerProvider>
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </PlayerProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
