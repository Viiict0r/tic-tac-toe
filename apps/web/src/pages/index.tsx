import React, { useEffect, useState } from 'react'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { useProfile } from '@hooks/useProfile'
import { useGame } from '@hooks/useGame'
import { Events } from '@utils/events'

import styles from '@styles/Index/Index.module.scss'
import Router from 'next/router'
import Logo from '@components/Logo'

export default function Index() {
  const [nickField, setNickField] = useState('')
  const [loading, setLoading] = useState(false)

  const { connection } = useGame()
  const { user, setProfile } = useProfile()

  const handleContinue = () => {
    setLoading(true)
    connection?.emit(
      Events.JOIN_LOBBY,
      { nickname: nickField },
      (error: string) => {
        if (error) {
          alert(error)
          setLoading(false)
          return
        }

        setTimeout(() => {
          setProfile({
            nickname: nickField
          })
        }, 800)
      }
    )
  }

  useEffect(() => {
    if (user) {
      Router.push('/lobby')
    }
  }, [user])

  const handleInputChange = (event: any) => {
    setNickField(event.target.value)
  }

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.input__wrapper}>
          <span>Para continuar, informe um nickname:</span>
          <Input
            placeholder="Ex.: Viiict0r"
            onChange={handleInputChange}
            value={nickField}
          />
          <Button disabled={loading} onClick={handleContinue}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
