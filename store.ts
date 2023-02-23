import { User } from 'firebase/auth'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  error: any
  setError: (error: any) => void
  imageUrl: string | null
  setImageUrl: (imageUrl: string) => void
}

const useStore = create<State>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    error: null,
    setError: (error) => set({ error }),
    imageUrl: null,
    setImageUrl: (imageUrl) => set({ imageUrl })
  }))
)

export default useStore
