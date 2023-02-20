import { useLocation } from 'wouter'
import Button from './Button'

export default function Menu() {
  const [_, setLocation] = useLocation()

  return (
    <>
      <Button
        onClick={() => setLocation('/singleplayer')}
        className='bg-green-500 shadow-green-600 p-3 text-center'
      >
        Haz Jolin en solitario
      </Button>
      <Button
        onClick={() => setLocation('/lobby')}
        className='bg-yellow-500 shadow-yellow-600 p-3'
      >
        Jolinea con gente
      </Button>
      <Button
        onClick={() => setLocation('/ranking')}
        className='bg-blue-500 shadow-blue-600 p-3'
      >
        Ranking
      </Button>
    </>
  )
}
