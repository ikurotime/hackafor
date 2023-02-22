import { child, get, getDatabase, ref as databaseRef } from 'firebase/database'
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage'
import { useEffect } from 'react'
import useStore from '../../store'
import SettingsButton from './SettingsButton'
import Snackbar from './Snackbar'

export default function Layout({ children }) {
  const user = useStore((state) => state.user)
  const setImageUrl = useStore((state) => state.setImageUrl)
  const dbRef = databaseRef(getDatabase())
  const storage = getStorage()
  let avatarRef
  useEffect(() => {
    if (!user) return
    get(child(dbRef, 'users/' + user?.uid + '/avatar')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        avatarRef = storageRef(storage, `avatar/${snapshot.val()}.png`)
      } else {
        console.log('No data available')
        avatarRef = storageRef(storage, 'avatar/goku.png')
      }
      getDownloadURL(avatarRef).then((url) => {
        setImageUrl(url)
      })
    })
  }, [user])
  return (
    <div className='App'>
      <div className='Container relative gap-8 '>
        <SettingsButton />
        {children}
      </div>
      <Snackbar />
    </div>
  )
}
