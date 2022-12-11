import { defineStore } from 'pinia'

interface CounterState {
  counter: number
}

export const useCounterStore = defineStore({
  id: 'counter',
  state: (): CounterState => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment(): void {
      this.counter ++
    }
  },
  persist: true,
})
