import { signInWithPopup } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { doc, setDoc } from 'firebase/firestore'
import { useLocation } from 'wouter'
import { auth, database, db, provider } from '../../firebase'
import useStore from '../../store'

export default function SocialButtons({ className }) {
  const { user, setUser, setError } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setError: state.setError
  }))

  const signInWithGithub = () => {
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
        const errorMessage = error.message
        setError(errorMessage)
        console.error(errorMessage)
      })
  }
  return (
    <div className={'flex gap-3 ' + className}>
      {user ? (
        <p>Logged in as {user.displayName}</p>
      ) : (
        <>
          <button
            onClick={signInWithGithub}
            className='bg-slate-600 p-3 text-sm  '
          >
            LOGIN WITH GITHUB
          </button>
          <button className='bg-slate-500 p-3 text-sm '>
            LOGIN WITH GOOGLE
          </button>
        </>
      )}
    </div>
  )
}
