import { Route } from 'wouter'
import Index from './Index'
import Lobby from './Lobby'
import Ranking from './Ranking'
import Singleplayer from './Singleplayer'
import Multiplayer from './Multiplayer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import useStore from '../store'
import { useEffect } from 'react'
import Snackbar from './components/Snackbar'
import { Switch } from 'wouter'
import Settings from './Settings'
import Layout from './components/Layout'

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
