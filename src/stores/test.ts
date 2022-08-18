import { defineStore } from 'pinia'

const TestStore = defineStore('test', {
  state: () => {
    return {
      url: 0
    }
  },
  actions: {
    changeCollapseState(url: number) {
      this.url = url
    }
  }
})

export const useTestStore = TestStore()
useTestStore.$subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation)
  console.log(state)

  localStorage.setItem('test', state.url.toString())
  //   localStorage.setItem('test', JSON.stringify(state))
})
