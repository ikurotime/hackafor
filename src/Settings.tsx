import { getStorage, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import './App.css'
import LogOut from './components/LogOut'
import SocialButtons from './components/SocialButtons'

function Settings() {
  const [avatars, setAvatars] = useState([])
  useEffect(() => {
    const storageRef = ref(getStorage(), 'avatars')
  }, [])
  return (
    <>
      <h1 className='text-3xl md:text-5xl'>Settings</h1>
      <div className='flex flex-col  gap-10 p-5'>
        <SocialButtons className='absolute top-10 left-10' />
        <p>Avatar:</p>
        <LogOut />
      </div>
    </>
  )
}

export default Settings
