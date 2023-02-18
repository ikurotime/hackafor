import { useLocation } from 'wouter'
import Button from './Button'

export default function Menu() {
  const [_, setLocation] = useLocation()

  return (
    <>
      <Button
        onClick={() => setLocation('/singleplayer')}
        className='bg-green-600 p-3 text-center'
      >
        Haz Jolin en solitario
      </Button>
      <Button
        onClick={() => setLocation('/multiplayer')}
        className='bg-yellow-600 p-3'
      >
        Jolinea con gente
      </Button>
      <Button
        onClick={() => setLocation('/ranking')}
        className='bg-blue-600 p-3'
      >
        Ranking
      </Button>
    </>
  )
}
