import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      isCollapse: false
    }
  },
  actions: {
    changeCollapseState() {
      this.isCollapse = !this.isCollapse
    }
  }
})
