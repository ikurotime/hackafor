import { auth } from '../../firebase'
import useStore from '../../store'
import Button from './Button'

export default function LogOut() {
  const user = useStore((state) => state.user)
  const logout = () => auth.signOut()

  return user ? (
    <Button className='bg-red-400 shadow-red-500' onClick={logout}>
      Log out
    </Button>
  ) : null
}
