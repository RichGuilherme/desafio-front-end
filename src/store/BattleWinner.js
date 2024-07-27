import { create } from "zustand"

const useBattleStore = create((set) => ({
  status: {
    heroWinner: null,
    battleResults: [],
  },

  actions: {
    setBattleResults: (selectedHeroes) => {
      if (selectedHeroes.length === 2) {
        const [hero1, hero2] = selectedHeroes

        const compareStats = (stat1, stat2) => {
          if (stat1 > stat2) {
            return "hero1"
          }
          if (stat2 > stat1) {
            return "hero2"
          }
          return "tie"
        }

        const results = Object.keys(hero1.powerstats).map(stat => ({
          stat,
          winner: compareStats(hero1.powerstats[stat], hero2.powerstats[stat]),
        }))

        const hero1Power = results.filter(result => result.winner === "hero1").length
        const hero2Power = results.filter(result => result.winner === "hero2").length

        const winner = hero1Power > hero2Power ? hero1 : hero2

        set({
          status: {
            heroWinner: winner,
            battleResults: results,
          }
        })
      }
    },
  }
}))

export default useBattleStore