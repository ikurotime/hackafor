import { onValue, ref } from 'firebase/database'
import { useState, useEffect } from 'react'
import { database } from '../firebase'
import LogOut from './components/LogOut'
import SettingsButton from './components/SettingsButton'
import SocialButtons from './components/SocialButtons'

export default function Ranking() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val()
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

  const roomsRef = ref(database, `rooms`) || null

  return (
    <div className='App'>
      <div className='Container relative gap-8 '>
        <SettingsButton />

        <SocialButtons className={'absolute top-10 left-10'} />
        <h1>Ranking</h1>
        <ul className=''>
          {rooms.map(({ id, count }) => (
            <li className='flex gap-4' key={id}>
              <h2> {id}:</h2>{' '}
              <span className='group-active:scale-110'>{count ?? 0}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
