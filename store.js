import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    error: null,
    setError: (error) => set({ error })
  }))
)

export default useStore
