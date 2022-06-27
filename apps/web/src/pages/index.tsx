import React, { useEffect, useState } from 'react'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { usePlayer } from '@hooks/usePlayer'
import { api } from '@services/axios-api'

import styles from '@styles/Index/Index.module.scss'
import Router from 'next/router'
import Logo from '@components/Logo'

export default function Index() {
  const [nickField, setNickField] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { player, connect } = usePlayer()

  const handleContinue = async () => {
    setLoading(true)

    try {
      const response = await api.post('/lobby', {
        name: nickField
      })

      const { token } = response.data

      setTimeout(async () => {
        await connect({ name: nickField, token })
      }, 900)
    } catch (error: any) {
      console.log(error)
      setLoading(false)

      if (error.response?.data?.message) {
        setError(error.response.data.message)
        return
      }

      if (typeof error === 'string') {
        setError(error)
      }
    }
  }

  useEffect(() => {
    if (player) {
      Router.push('/lobby')
    }
  }, [player])

  const handleInputChange = (event: any) => {
    if (error) setError(null)

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
            placeholder="Ex.: Jorge123"
            onChange={handleInputChange}
            className={styles.input_container}
            value={nickField}
            hasError={!!error}
            error={error}
          />
          <Button disabled={loading} loading={loading} onClick={handleContinue}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
