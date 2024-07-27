import useCharactersStore from "@/store/HeroesStore"
import axios from "axios"
import { useEffect } from "react"

export const useFetch = () => {
  const { status: { characters, searchQuery }, actions: { setCharacters } } = useCharactersStore()

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("https://homologacao3.azapfy.com.br/api/ps/metahumans")
        setCharacters(response.data)

      } catch (error) {
        console.error("Erro ao buscar personagens:", error)
      }
    }

    fetchCharacters()
  }, [setCharacters])

  const filteredCharacters = characters?.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return filteredCharacters
}
