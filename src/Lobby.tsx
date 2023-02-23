import { useState } from 'react'
import { useLocation } from 'wouter'

import Button from './components/Button'
import SocialButtons from './components/SocialButtons'

export default function Lobby() {
  const [id, setId] = useState('')
  const [, setLocation] = useLocation()

  function handleJoin() {
    setLocation(`/${id}`)
  }

  return (
    <>
      <SocialButtons className={'absolute top-10 left-10'} />
      <h1>Multiplayer</h1>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        type='text'
        placeholder='Nombre de la sala'
        className='bg-slate-500 shadow-slate-600 p-3'
      />
      <div className='flex gap-8'>
        <Button onClick={handleJoin} className='bg-slate-500 shadow-slate-600'>
          Unirse una sala
        </Button>
      </div>
    </>
  )
}
