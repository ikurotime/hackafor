import { auth } from '../../firebase'

export default function LogOut() {
  const logout = () => auth.signOut()

  return (
    <button className='absolute top-10 right-10' onClick={logout}>
      Log out
    </button>
  )
}
