"use client"

import Image from "next/image"
import { useFetch } from "@/hook/useFetch"
import useSelectedHeroes from "@/store/SelectedHeroesStore"
import { ModalHeroWin } from "./ModalHeroWin"
import { useEffect, useState } from "react"


export const HeroesList = () => {
  const heroesData = useFetch()
  const [open, setOpen] = useState(false)
  const {
    status: { selectedHeroes },
    actions: { setHeroesBattle, resetHeroes }
  } = useSelectedHeroes()

  const handleOpen = () => {
    setOpen(!open)
    resetHeroes()
  }

  useEffect(() => {
    if (selectedHeroes.length === 2) {
      setOpen(true)
    }
  }, [selectedHeroes])


  if (!heroesData) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-black text-white text-4xl" >
        Loading...
      </div>
    )
  }

  return (
    <div className="bg-black py-11 min-h-[calc(100vh-64px)] box-border" >
      <ul className="flex flex-wrap justify-center gap-8 w-full px-10 relative">
        {heroesData.length > 0 ? (
          heroesData.map(item => (
            <li
              key={item.id}
              className={`p-3 cursor-pointer ${selectedHeroes.includes(item) ? "shadow-gray-500 shadow-xl" : "hover:shadow-gray-600 shadow-xl"} `}
              onClick={() => setHeroesBattle(item)} >

              <Image
                src={item.images.md}
                alt="herois image"
                width={280}
                height={180}
                style={{ borderRadius: "15px" }} />

              <p className="text-2xl mt-2 text-white" >{item.name}</p>

            </li>
          ))
        ) : (

          <div className="flex justify-center items-center min-h-[calc(100vh-300px)] w-full">
            <p className="text-white text-4xl"> Heroi não encontrado! </p>
          </div>
        )}
      </ul>

      <ModalHeroWin open={open} heroesSelected={selectedHeroes} handleOpen={handleOpen} />
    </div>
  )
}
