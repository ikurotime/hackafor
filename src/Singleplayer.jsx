import { child, get, getDatabase, onValue, ref, set } from 'firebase/database'
import { getDownloadURL, ref as dbRef, getStorage } from 'firebase/storage'
import { useState } from 'react'
import { useEffect } from 'react'
import { auth, database } from '../firebase'
import useStore from '../store'
import Button from './components/Button'
import LogOut from './components/LogOut'
import SettingsButton from './components/SettingsButton'
import SocialButtons from './components/SocialButtons'

export default function Singleplayer() {
  const { user } = useStore((state) => ({
    user: state.user
  }))

  const [jolin, setJolin] = useState(0)
  const storage = getStorage()
  const avatarRef = dbRef(storage, 'avatar/ana.png')
  useEffect(() => {
    getDownloadURL(avatarRef).then((url) => {
      setImageUrl(url)
    })
  }, [avatarRef])
  const [imageUrl, setImageUrl] = useState('')
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
      console.log({ data })
    })
    /*  get(child(dbRef, `users/${user.uid}/jolin`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          setJolin(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      }) */
  }, [user])

  return (
    <div className='App'>
      <div className='Container relative gap-8 '>
        <SettingsButton />

        <SocialButtons className={'absolute top-10 left-10'} />
        <h1>Singleplayer</h1>
        <div className='flex flex-col items-center gap-5 group'>
          <div className='flex gap-3'>
            <h2> Jolines:</h2>{' '}
            <span className='group-active:scale-110'>{jolin}</span>
          </div>
          <img
            id='id_avatar'
            src={imageUrl}
            className='avatar-bg w-48  h-48 aspect-square  text-black items-center flex p-3 group-active:-translate-y-1 transition-transform'
          />

          <Button
            onClick={sendJolin}
            className='p-3 bg-orange-400 shadow-orange-500'
          >
            JOLIN!
          </Button>
        </div>
      </div>
    </div>
  )
}
