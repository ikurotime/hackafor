import { Route } from 'wouter'
import App from './App'
import Multiplayer from './Multiplayer'
import Ranking from './Ranking'
import Singleplayer from './Singleplayer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import useStore from '../store'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Router() {
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user has logged in')
        setUser(user)
      } else {
        console.log('user has logged out')
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Route path='/' component={App} />
      <Route path='/singleplayer' component={Singleplayer} />
      <Route path='/multiplayer' component={Multiplayer} />
      <Route path='/ranking' component={Ranking} />
    </>
  )
}
