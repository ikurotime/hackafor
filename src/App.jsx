import { useLocation } from 'wouter'
import './App.css'
function App() {
  const [_, setLocation] = useLocation()
  return (
    <div className='App '>
      <div className='Container relative gap-8 '>
        <h1 className='text-3xl md:text-5xl'>ElJolinJuego</h1>
        <div className='flex flex-col  gap-10 p-5'>
          <div className=' flex gap-3'>
            <button className='bg-slate-600 p-3 text-sm  '>
              LOGIN WITH GITHUB
            </button>
            <button className='bg-slate-500 p-3 text-sm '>
              LOGIN WITH GOOGLE
            </button>
          </div>
          <button
            onClick={() => setLocation('/singleplayer')}
            className='bg-green-600 p-3'
          >
            Haz Jolin en solitario
          </button>
          <button
            onClick={() => setLocation('/multiplayer')}
            className='bg-yellow-600 p-3'
          >
            Jolinea con gente
          </button>
          <button
            onClick={() => setLocation('/ranking')}
            className='bg-blue-600 p-3'
          >
            Ranking
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
