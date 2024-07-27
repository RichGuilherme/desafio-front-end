import useCharactersStore from "@/store/HeroesStore"

export const SeachItem = () => {
  const {
    status: { searchQuery },
    actions: { setSearchQuery }
  } = useCharactersStore()

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const handlerPressKey = (event) => {
    if (event.key === "Enter") {
      handleSearch(event)
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar"
        value={searchQuery}
        onKeyDown={handlerPressKey}
        onChange={handleSearch}
        className="ml-7 pl-3 py-1 rounded-md outline-none" />
    </>
  )
}
