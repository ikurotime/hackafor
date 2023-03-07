import { onValue, ref, update } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { database } from '../firebase'
import useStore from '../store'
import Button from './components/Button'
import SocialButtons from './components/SocialButtons'

export default function Multiplayer() {
  const { user, imageUrl } = useStore((state) => ({
    user: state.user,
    imageUrl: state.imageUrl
  }))
  const [key] = useLocation()
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState(0)

  useEffect(() => {
    if (!user) return
    onValue(countRef, (snapshot) => {
      const data = snapshot.val()
      setCount(data.jolin)
    })
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      setUsers(data)
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

  const countRef = ref(database, `rooms/${key}/${user.uid}`) || null
  const usersRef = ref(database, `rooms/${key}/`) || null

  const sendJolin = () => {
    user &&
      update(countRef, {
        displayName: user.displayName,
        jolin: count + 1,
        avatar: imageUrl
      })
    setCount(count + 1)
  }

  return (
    <>
      <SocialButtons className={'absolute top-10 left-10'} />
      <h1>Multiplayer</h1>
      <article className='grid grid-cols-2 gap-8'>
        {users &&
          Object.entries(users).map(([id, { jolin: count, displayName }]) => (
            <div className='flex gap-3 items-center' key={id}>
              <h2> {id === user.uid ? `(tu)` : displayName}:</h2>{' '}
              <span className='group-active:scale-110'>{count ?? 0}</span>
              <img className='avatar w-12 h-12' src={imageUrl as string} />
            </div>
          ))}
      </article>
      <div className='flex flex-col items-center gap-5'>
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
