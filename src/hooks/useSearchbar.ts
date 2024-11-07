import { create } from 'zustand'

interface SearchbarStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useSearchbar = create<SearchbarStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))
