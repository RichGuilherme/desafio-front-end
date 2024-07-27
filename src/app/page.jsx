"use client"

import { HeroesList } from "@/components/HeroesList"
import { SeachItem } from "@/components/SeachItem"

export default function Home() {
  return (
    <>
      <header className="w-full h-16 flex items-center bg-gradient-to-r from-orange-500 to-amber-100">
        <SeachItem />
      </header>

      <main className="h-full relative">
        <HeroesList />
      </main>
    </>
  )
}
