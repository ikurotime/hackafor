import { Route } from 'wouter'
import Index from './Index'
import Multiplayer from './Multiplayer'
import Ranking from './Ranking'
import Singleplayer from './Singleplayer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import useStore from '../store'
import { useState } from 'react'
import { useEffect } from 'react'
import Snackbar from './components/Snackbar'

export default function App() {
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Route path='/' component={Index} />
      <Route path='/singleplayer' component={Singleplayer} />
      <Route path='/multiplayer' component={Multiplayer} />
      <Route path='/ranking' component={Ranking} />
      <Snackbar />
    </>
  )
}
