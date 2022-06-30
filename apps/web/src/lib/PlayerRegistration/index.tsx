import React, { useState } from 'react'

import Logo from '@components/Logo'
import { Input } from '@components/Input'

import styles from './styles.module.scss'
import { Button } from '@components/Button'
import { AvatarKey } from '@components/Avatar'
import { AvatarSelect } from './components/AvatarSelect'
import { api } from '@services/axios-api'
import { usePlayer } from '@hooks/usePlayer'

/**
 * TODO: Improve form validations and errors
 */

export const PlayerRegistration: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarKey | null>(null)
  const [nickField, setNickField] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [avatarError, setAvatarError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const { connect, player } = usePlayer()

  const handleAvatarSelection = (option: AvatarKey) => {
    setSelectedAvatar(option)

    if (avatarError) setAvatarError(null)
  }

  const mapAvatarOptions = () => {
    const options: AvatarKey[] = [
      'actor-chaplin',
      'avatar-batman',
      'avatar-cloud-crying',
      'avatar-muslim',
      'male-man-old'
    ]

    return options.map(option => (
      <AvatarSelect
        avatarKey={option}
        key={option}
        selected={selectedAvatar === option}
        onSelect={() => handleAvatarSelection(option)}
        errored={!!avatarError}
      />
    ))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const regex = /[^A-Za-z0-9_@]/g

    if (!nickField || nickField.length < 3) {
      setError('Seu nickname deve ter ao menos 3 caracteres.')
      return
    }

    if (regex.test(nickField)) {
      setError(
        'Seu nickname não pode conter caracteres especiais e nem espaços.'
      )
      return
    }

    if (nickField.length > 16) {
      setError('Seu nickname deve ter no máximo 16 caracteres.')
      return
    }

    if (error) setError(null)

    if (!selectedAvatar) {
      setAvatarError('Selecione um avatar')
      return
    }

    if (avatarError) setAvatarError(null)

    setLoading(true)

    try {
      const response = await api.post('/lobby', {
        name: nickField
      })

      const { token } = response.data

      await connect({ name: nickField, token, avatar: selectedAvatar })
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

  if (player) return null

  return (
    <div className={styles.container}>
      <div>
        <Logo />

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__input_wrapper}>
            <span>
              Para continuar, digite um nickname e selecione um avatar para
              jogar:
            </span>
            <Input
              name="nickname"
              value={nickField}
              error={error}
              hasError={!!error}
              onChange={e => {
                if (error) setError(null)

                setNickField(String(e.target.value).trim())
              }}
              className={styles.form__input_wraper___input}
              placeholder="Ex.: John_Doe"
            />
          </div>

          <div className={styles.form__avatar_wrapper}>
            {mapAvatarOptions()}

            {avatarError && (
              <div className={styles.form__avatar_wrapper__error}>
                <span>{avatarError}</span>
              </div>
            )}
          </div>

          <div>
            <Button disabled={loading} loading={loading}>
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
