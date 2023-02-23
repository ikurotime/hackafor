import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Route, Switch } from 'wouter'
import { auth } from '../firebase'
import useStore from '../store'
import Layout from './components/Layout'
import Index from './Index'
import Lobby from './Lobby'
import Multiplayer from './Multiplayer'
import Ranking from './Ranking'
import Settings from './Settings'
import Singleplayer from './Singleplayer'

export default function App() {
  const { setUser, clearUser } = useStore((state) => ({
    setUser: state.setUser,
    clearUser: state.clearUser
  }))

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        clearUser()
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <Layout>
      <Switch>
        <Route path='/' component={Index} />
        <Route path='/singleplayer' component={Singleplayer} />
        <Route path='/lobby' component={Lobby} />
        <Route path='/ranking' component={Ranking} />
        <Route path='/settings' component={Settings} />
        <Route path='/:id' component={Multiplayer} />
      </Switch>
    </Layout>
  )
}
