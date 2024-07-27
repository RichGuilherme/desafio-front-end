import { create } from "zustand"

const useCharactersStore = create((set) => ({
  status: {
    characters: null,
    searchQuery: "",
  },

  actions: {
    setCharacters: (characters) => set((state) => ({
      status: {
        ...state.status,
        characters
      }
    })),
    setSearchQuery: (query) => set((state) => ({
      status: {
        ...state.status,
        searchQuery: query
      }
    })),
  }
}))

export default useCharactersStore