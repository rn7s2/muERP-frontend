import { createStore } from 'vuex'

export default createStore({
  state: {
    items: []
  },
  getters: {
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
