import { child, get, getDatabase, onValue, ref, set } from 'firebase/database'
import { useState } from 'react'
import { useEffect } from 'react'
import { auth, database } from '../firebase'
import { useLocation } from 'wouter'
import useStore from '../store'
import Button from './components/Button'
import LogOut from './components/LogOut'
import SocialButtons from './components/SocialButtons'
import SettingsButton from './components/SettingsButton'

export default function Multiplayer() {
  const { user } = useStore((state) => ({
    user: state.user
  }))
  const [key] = useLocation()
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState(0)

  useEffect(() => {
    if (!user) return
    onValue(countRef, (snapshot) => {
      const data = snapshot.val()
      setCount(data)
      console.log({ data })
    })
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      setUsers(data)
      console.log({ data })
    })
  }, [user])

  if (!user?.uid)
    return (
      <div className='App'>
        <div className='Container gap-8 h-screen w-screen grid place-content-center'>
          <SocialButtons />
        </div>
      </div>
    )

  const countRef = ref(database, `rooms/${key}/${user.uid}/jolin`) || null
  const usersRef = ref(database, `rooms/${key}/`) || null

  const sendJolin = () => {
    user && set(countRef, count + 1)
    setCount(count + 1)
  }

  console.log('count, users:', count, users)

  return (
    <>
      <SocialButtons className={'absolute top-10 left-10'} />
      <h1>Multiplayer</h1>
      <article className='grid grid-cols-2 gap-8'>
        {users &&
          Object.entries(users).map(([id, { jolin: count }]) => (
            <div className='flex gap-3' key={id}>
              <h2> Jolines {id === user.uid && `(tu)`}:</h2>{' '}
              <span className='group-active:scale-110'>{count ?? 0}</span>
            </div>
          ))}
      </article>
      <div className='flex flex-col items-center gap-5 group'>
        <Button
          onClick={sendJolin}
          className='p-3 bg-orange-400 shadow-orange-500'
        >
          JOLIN!
        </Button>
      </div>
    </>
  )
}
