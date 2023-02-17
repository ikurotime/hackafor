import { useLocation } from 'wouter'

export default function Menu() {
  const [_, setLocation] = useLocation()

  return (
    <>
      <button
        onClick={() => setLocation('/singleplayer')}
        className='bg-green-600 p-3 text-center'
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
    </>
  )
}
