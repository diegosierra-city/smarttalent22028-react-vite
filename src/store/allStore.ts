import { create } from 'zustand'

interface Store{
 login: boolean
 loginChange: (value:boolean) => void
}

export const useStore = create<Store>((set) => ({
  login: false,
  //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //removeAllBears: () => set({ bears: 0 }),
  loginChange: (value) => set(() => ({ login: value })),
  
}))