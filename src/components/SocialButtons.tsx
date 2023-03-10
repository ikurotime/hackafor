import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import { useLocation } from 'wouter'
import { auth, database, GithubProvider, GoogleProvider } from '../../firebase'
import useStore from '../../store'
import Button from './Button'
import GoogleWord from './GoogleWord'

const ERRORS: { [key: string]: string } = {
  'auth/invalid-email': 'Email inválido',
  'auth/user-disabled': 'Usuario deshabilitado',
  'auth/user-not-found': 'Usuario no encontrado',
  'auth/account-exists-with-different-credential':
    'Ya existe una cuenta con ese email, inicia sesion con otro proveedor'
}
export default function SocialButtons({ className = '' }) {
  const { user, setUser, setError } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setError: state.setError
  }))
  const [location, setLocation] = useLocation()
  const signInWith = (provider: GoogleAuthProvider | GithubAuthProvider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
        get(child(ref(getDatabase()), `users/${result.user.uid}`))
          .then((snapshot) => {
            if (!snapshot.exists()) {
              set(ref(database, 'users/' + result.user.uid), {
                avatar: 'feral',
                displayName: result.user.displayName
              })
            }
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        const errorMessage: any = error.code
        if (errorMessage in ERRORS)
          setError(ERRORS[errorMessage] || errorMessage)

        setTimeout(() => setError(null), 3000)
        console.error(error)
      })
  }
  return (
    <div className={'flex gap-3 ' + className}>
      {location !== '/' && (
        <Button
          className='bg-gray-500 shadow-gray-600'
          onClick={() => setLocation('/')}
        >
          back
        </Button>
      )}
      {user ? (
        <p className='max-w-[300px]'>
          Logged in as: <br /> {user.displayName}
        </p>
      ) : (
        <>
          <Button
            onClick={() => signInWith(GithubProvider)}
            className='text-sm bg-gray-500 shadow-gray-600'
          >
            LOGIN WITH GITHUB
          </Button>
          <Button
            onClick={() => signInWith(GoogleProvider)}
            className='text-sm text-slate-600 bg-gray-100 shadow-gray-300 flex flex-col min-w-[50%] items-center justify-center'
          >
            LOGIN WITH <GoogleWord />
          </Button>
        </>
      )}
    </div>
  )
}
