import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../firebase'
import SocialButtons from './components/SocialButtons'

export default function Ranking() {
  const [rooms, setRooms] = useState<any>([])
  const roomsRef = ref(database, `rooms`) || null
  interface RoomData {
    [key: string]: {
      [key: string]: {
        jolin: number
      }
    }
  }
  useEffect(() => {
    onValue(roomsRef, (snapshot) => {
      const data: RoomData = snapshot.val()
      const jolines = Object.values(data).reduce((users, room) => {
        Object.entries(room).forEach(([user, { jolin: count }]) => {
          if (!users.has(user)) {
            users.set(user, 0)
          }

          users.set(user, users.get(user) + count)
        })

        return users
      }, new Map())
      const rooms = Array.from(jolines, ([id, count]) => ({ id, count })).sort(
        (a, b) => b.count - a.count
      )
      setRooms(rooms)
    })
  }, [])

  return (
    <>
      <SocialButtons className={'absolute top-10 left-10'} />
      <h1>Ranking</h1>
      <ul className=''>
        {rooms.map(({ id, count }: { id: string; count: number }) => (
          <li className='flex gap-4' key={id}>
            <h2> {id}:</h2>{' '}
            <span className='group-active:scale-110'>{count ?? 0}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
