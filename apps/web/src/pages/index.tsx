import React, { useEffect } from 'react'
import { PlayerRegistration } from '@lib/PlayerRegistration'

import { usePlayer } from '@hooks/usePlayer'

import Router from 'next/router'
import Head from 'next/head'

export default function Index() {
  const { player } = usePlayer()

  useEffect(() => {
    if (player) {
      Router.push('/lobby')
    }
  }, [player])

  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <div className="container">
        <PlayerRegistration />
      </div>
    </>
  )
}
