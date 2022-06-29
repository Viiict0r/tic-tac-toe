import React, { useEffect } from 'react'
import { PlayerRegistration } from '@lib/PlayerRegistration'

import { usePlayer } from '@hooks/usePlayer'

import Router from 'next/router'

export default function Index() {
  const { player } = usePlayer()

  useEffect(() => {
    if (player) {
      Router.push('/lobby')
    }
  }, [player])

  return (
    <div className="container">
      <PlayerRegistration />
    </div>
  )
}
