import { defineStore } from 'pinia'

export const useScoreStore = defineStore('score', {
  state: () => ({
    score: 0, // Базовый уровень, следующие будем получать по API
  }),
  getters: {
    level(state) {
      return computeLevelByScore(state.score)
    },
    // Этот счет нужен для отображения текущего прогресса
    currentScore(state) { 
      if (this.level.level === 0) {
        return state.score
      }
      return state.score - levelScores[this.level.level - 1]
    },
  },
  actions: {
    add(score = 1) {
      this.score += score
    },
    setScore(score) {
      this.score = score
    },
  },
})

// Базовый счет первого уровня
const baseLevelScore = 25

// Формула по вычислению уровней и количества очков для каждого из них
const levels = new Array(15)
  .fill(0)
  .map((_, i) => baseLevelScore * Math.pow(2, i))

  // Вычисляем сумму очков для каждого уровня
const levelScores = levels.map((_, level) => {
  let sum = 0
  for (let [index, value] of levels.entries()) {
    if (index >= level) {
      return sum + value
    }
    sum += value
  }
  return sum
})

// Вычисляем уровень в зависимости от текущего счета
function computeLevelByScore(score) {
  for (let [index, value] of levelScores.entries()) {
    if (score <= value) {
      return {
        level: index,
        value: levels[index],
      }
    }
  }
}

