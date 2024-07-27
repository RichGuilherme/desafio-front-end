import { create } from "zustand"

const useSelectedHeroes = create((set) => ({
  status: {
    selectedHeroes: [],
    openModal: false,
  },

  actions: {
    setHeroesBattle: (hero) => set((state) => {
      const { selectedHeroes } = state.status

      if (selectedHeroes.includes(hero)) {
        return {
          status: {
            ...state.status,
            selectedHeroes: selectedHeroes.filter(h => h !== hero)
          }
        }
      }

      return {
        status: {
          ...state.status,
          selectedHeroes: selectedHeroes.length < 2 ? [...selectedHeroes, hero] : [selectedHeroes[1], hero],
          openModal: selectedHeroes.length === 1 ? true : false
        }
      }
    }),
    resetHeroes: () => set((state) => ({
      status: {
        ...state.status,
        selectedHeroes: []
      }
    }))
  }
}))

export default useSelectedHeroes