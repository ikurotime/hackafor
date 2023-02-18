import { signInWithPopup } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { doc, setDoc } from 'firebase/firestore'
import { useLocation } from 'wouter'
import { auth, database, GithubProvider, GoogleProvider } from '../../firebase'
import useStore from '../../store'
import Button from './Button'
import GoogleWord from './GoogleWord'
const ERRORS = {
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

  const signInWith = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        /* setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName
        }) */
        set(ref(database, 'users/' + user.uid), {
          displayName: user.displayName
        })
        setUser(user)
      })
      .catch((error) => {
        const errorMessage = error.code
        setError(ERRORS[errorMessage] || errorMessage)
        setTimeout(() => setError(null), 3000)
        console.error(error)
      })
  }
  return (
    <div className={'flex gap-3 ' + className}>
      {user ? (
        <p>Logged in as {user.displayName}</p>
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
