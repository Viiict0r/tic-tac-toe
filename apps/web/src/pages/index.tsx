import React, { useEffect, useState } from 'react'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { usePlayer } from '@hooks/usePlayer'

import styles from '@styles/Index/Index.module.scss'
import Router from 'next/router'
import Logo from '@components/Logo'

export default function Index() {
  const [nickField, setNickField] = useState('')
  const [loading, setLoading] = useState(false)

  const { player, connect } = usePlayer()

  const handleContinue = () => {
    setLoading(true)

    setTimeout(async () => {
      try {
        await connect(nickField)
      } catch (error: any) {
        alert(error)
        setLoading(false)
      }
    }, 800)
  }

  useEffect(() => {
    if (player) {
      Router.push('/lobby')
    }
  }, [player])

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
