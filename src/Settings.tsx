import {
  child,
  get,
  getDatabase,
  ref as databaseRef,
  update
} from 'firebase/database'
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import useStore from '../store'
import './App.css'
import LogOut from './components/LogOut'
import SocialButtons from './components/SocialButtons'

interface Avatar {
  url: string
  name: string
}
function Settings() {
  const { user, setImageUrl } = useStore((state) => ({
    user: state.user,
    setImageUrl: state.setImageUrl
  }))
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [selectedAvatarName, setSelectedAvatarName] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  useEffect(() => {
    const avatarRef = ref(getStorage(), 'avatar')
    //get all the files and directories
    listAll(avatarRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          getDownloadURL(itemRef).then((url) => {
            setAvatars((prev) => [
              ...prev,
              { url, name: itemRef.name.split('.')[0] }
            ])
          })
        })
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        throw error
      })
  }, [])
  useEffect(() => {
    const dbRef = databaseRef(getDatabase(), `users/${user?.uid}`)
    get(child(dbRef, 'avatar')).then((snapshot) => {
      if (snapshot.exists()) {
        setSelectedAvatarName(snapshot.val())
      } else {
        console.log('No data available')
      }
    })
  }, [user])

  const changeAvatar = (avatar: Avatar) => {
    setSelectedAvatarName(avatar.name.split('.')[0])
    update(databaseRef(getDatabase(), `users/${user?.uid}`), {
      avatar: avatar.name.split('.')[0]
    })
    setImageUrl(avatar.url)
  }
  const changeUserName = (displayName: string) => {
    setTimeout(() => {
      update(databaseRef(getDatabase(), `users/${user?.uid}`), {
        displayName
      })
    }, 300)
  }
  useEffect(() => {
    if (!displayName) return
    changeUserName(displayName)
  }, [displayName])

  return (
    <>
      <h1 className='text-3xl md:text-5xl'>Settings</h1>
      <div className='flex flex-col  gap-10 p-5'>
        <SocialButtons className='absolute top-10 left-10' />
        {/* <p>Username:</p>
        <input
          type='text'
          className='p-3 bg-gray-600 shadow-gray-500'
          placeholder={user?.displayName || 'Username'}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        /> */}
        <p>Avatar:</p>
        <div className='grid place-content-center grid-cols-3 gap-5'>
          {avatars.map((avatar, index) => (
            <img
              key={avatar.name + index}
              src={avatar.url}
              alt='avatar'
              onClick={() => changeAvatar(avatar)}
              className={
                'avatar w-20 h-20 hover:outline ' +
                (avatar.name === selectedAvatarName
                  ? 'outline outline-orange-500 outline-2'
                  : '')
              }
            />
          ))}
        </div>
        <LogOut />
      </div>
    </>
  )
}

export default Settings
