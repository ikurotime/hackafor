import { Route } from 'wouter'
import App from './App'
import Multiplayer from './Multiplayer'
import Ranking from './Ranking'
import Singleplayer from './Singleplayer'

export default function Router() {
  return (
    <>
      <Route path='/' component={App} />
      <Route path='/singleplayer' component={Singleplayer} />
      <Route path='/multiplayer' component={Multiplayer} />
      <Route path='/ranking' component={Ranking} />
    </>
  )
}
