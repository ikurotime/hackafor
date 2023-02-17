import { child, get, getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react'
import { useEffect } from 'react'
import { auth, database } from '../firebase'
import useStore from '../store'
import LogOut from './components/LogOut'
import SocialButtons from './components/SocialButtons'

export default function Singleplayer() {
  const { user } = useStore((state) => ({
    user: state.user
  }))
  const [jolin, setJolin] = useState(0)

  useEffect(() => {
    if (jolin) {
      console.log(jolin)
    }
  }, [jolin])
  const sendJolin = () => {
    set(ref(database, 'users/' + user.uid + '/jolin'), jolin + 1)
    setJolin(jolin + 1)
  }
  useEffect(() => {
    if (!user) return
    const dbRef = ref(getDatabase())
    get(child(dbRef, `users/${user.uid}/jolin`))
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
      })
  }, [user])
  return (
    <div className='App'>
      <div className='Container  gap-8 '>
        <LogOut />
        <SocialButtons className={'absolute top-10 left-10'} />
        <h1>Singleplayer</h1>
        <h2>Jolines: {jolin}</h2>
        <button onClick={sendJolin} className='p-3 bg-orange-400'>
          JOLIN!
        </button>
      </div>
    </div>
  )
}
