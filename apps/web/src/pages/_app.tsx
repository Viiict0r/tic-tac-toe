import React from 'react'

import { AppProps } from 'next/app'
import { GameProvider } from '@hooks/useGame'
import { ProfileProvider } from '@hooks/useProfile'

import '../styles/global.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GameProvider>
      <ProfileProvider>
        <Component {...pageProps} />
      </ProfileProvider>
    </GameProvider>
  )
}

export default App
