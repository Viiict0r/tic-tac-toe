import React from 'react'
import Head from 'next/head'
import { ToastContainer, Slide } from 'react-toastify'

import { AppProps } from 'next/app'
import { GameProvider } from '@hooks/useGame'
import { PlayerProvider } from '@hooks/usePlayer'
import { ConnectionProvider } from '@hooks/useConnection'

import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/global.scss'

const description =
  'Jogo da velha online construído com NextJS e Socket.io para fins de estudo.'
const image = '/assets/xoxo.png'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta property="image" content={image} />

        <meta property="og:title" content="Tic Tac Toe" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />

        <meta property="twitter:title" content="Tic Tac Toe" />
        <meta property="twitter:description" content={description} />
      </Head>
      <ConnectionProvider>
        <PlayerProvider>
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </PlayerProvider>
      </ConnectionProvider>
      <ToastContainer
        draggable={false}
        autoClose={5000}
        hideProgressBar
        transition={Slide}
      />
    </>
  )
}

export default App
