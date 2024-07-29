import useBattleStore from "@/store/BattleWinner"
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react"
import Image from "next/image"
import { useEffect } from "react"

export const ModalHeroWin = ({ open, heroesSelected, handleOpen }) => {
  const {
    status: { heroWinner, battleResults },
    actions: { setBattleResults }
  } = useBattleStore()

  useEffect(() => {
    if (heroesSelected.length === 2) {
      setBattleResults(heroesSelected)
    }
  }, [heroesSelected, setBattleResults])

  const [hero1, hero2] = heroesSelected

  const getResultColor = (hero1Stat, hero2Stat) => {
    if (hero1Stat > hero2Stat) {
      return ["text-green-500", "text-red-500"]

    } else if (hero2Stat > hero1Stat) {
      return ["text-red-500", "text-green-500"]
    }

    return ["text-white", "text-white"]
  }


  return (
    <Dialog open={open} handler={handleOpen} className="bg-black min-w-full overflow-scroll sm:overflow-auto h-full sm:h-auto">
      <DialogHeader className="flex justify-center">
        <p className="text-2xl text-white text-center">
          Ganhador da batalha mortal foi
          <span className="font-bold text-green-500 text-nowrap"> {heroWinner?.name} </span>
        </p>
      </DialogHeader>

      <DialogBody className="flex gap-5 flex-wrap sm:flex-nowrap justify-center sm:w-full px-3 sm:px-6 mb-5  ">
        <div>
          <Image
            src={hero1?.images.lg}
            alt="imagem do heroi"
            width={180}
            height={180}
            style={{
              borderRadius: "15px",
            }}
          />
          <p className="text-white text-lg mt-2">{hero1?.name}</p>
        </div>


        <div className="flex justify-between mt-5 px-6 w-64 sm:w-80">
          <div className="flex flex-col gap-2">
            {battleResults.map(result => {
              const [hero1Color,] = getResultColor(hero1?.powerstats[result.stat], hero2?.powerstats[result.stat])
              return (
                <span
                  key={`hero1-${result.stat}`}
                  className={hero1Color}
                >
                  {hero1?.powerstats[result.stat]}
                </span>
              )
            })}
          </div>

          <div className="flex flex-col gap-2 text-center">
            {battleResults.map(result => (
              <p key={`stat-${result.stat}`}>{result.stat}</p>
            ))}
          </div>

          <div className="flex flex-col items-end gap-2">
            {battleResults.map(result => {
              const [, hero2Color] = getResultColor(hero1?.powerstats[result.stat], hero2?.powerstats[result.stat])
              return (
                <span
                  key={`hero2-${result.stat}`}
                  className={hero2Color}
                >
                  {hero2?.powerstats[result.stat]}
                </span>
              )
            })}
          </div>
        </div>

        <div>
          <Image
            src={hero2?.images.lg}
            alt="imagem do heroi"
            width={180}
            height={180}
            style={{
              borderRadius: "15px",
            }}
          />
          <p className="text-white text-lg mt-2">{hero2?.name}</p>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Ir para outra batalha</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}