import { createStore } from 'vuex'

export default createStore({
  state: {
    items: null
  },
  getters: {
    getItems (state) {
      if (state.items === null) {
        return null
      }
      return (state.items as any).map((item: any) => {
        const tmp = item
        const pos = tmp.expirationTime.indexOf('T')
        if (pos > 0) {
          tmp.expirationTime = tmp.expirationTime.substring(0, pos)
        }
        return tmp
      })
    }
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    }
  },
  actions: {
  },
  modules: {
  }
})
