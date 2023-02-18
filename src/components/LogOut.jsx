import { auth } from '../../firebase'
import useStore from '../../store'
import Button from './Button'

export default function LogOut() {
  const user = useStore((state) => state.user)
  const logout = () => auth.signOut()

  return user ? (
    <Button
      className='bg-red-400 shadow-red-500 absolute top-10 right-10'
      onClick={logout}
    >
      Log out
    </Button>
  ) : null
}
