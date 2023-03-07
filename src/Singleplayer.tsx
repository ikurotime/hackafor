import { onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../firebase'
import useStore from '../store'
import Button from './components/Button'
import SocialButtons from './components/SocialButtons'

export default function Singleplayer() {
  const { user, imageUrl } = useStore((state) => ({
    user: state.user,
    imageUrl: state.imageUrl
  }))

  const [jolin, setJolin] = useState(0)

  const jolinRef = ref(database, 'users/' + user?.uid + '/jolin') || null

  const sendJolin = () => {
    user && set(jolinRef, jolin + 1)
    setJolin(jolin + 1)
  }

  useEffect(() => {
    if (!user) return
    const dbRef = jolinRef
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      setJolin(data)
    })
  }, [user])

  return (
    <>
      <SocialButtons className={'absolute top-10 left-10'} />
      <h1>Singleplayer</h1>
      <div className='flex flex-col items-center gap-5 group'>
        <div className='flex gap-3'>
          <h2> Jolines:</h2>{' '}
          <span className='group-active:scale-110'>{jolin}</span>
        </div>
        <img
          src={imageUrl as string}
          className='avatar avatar-bg w-48  h-48 aspect-square  text-black items-center flex p-3 group-active:-translate-y-1 transition-transform'
        />

        <Button
          onClick={sendJolin}
          tabIndex={-1}
          className='p-3 bg-orange-400 shadow-orange-500 '
        >
          JOLIN!
        </Button>
      </div>
    </>
  )
}
