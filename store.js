import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    error: null,
    setError: (error) => set({ error }),
    imageUrl: null,
    setImageUrl: (imageUrl) => set({ imageUrl })
  }))
)

export default useStore
