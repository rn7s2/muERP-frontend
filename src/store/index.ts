import { createStore } from 'vuex'

export default createStore({
  state: {
    items: null,
    batchesAndItems: null
  },
  getters: {
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    },
    setBatchesAndItems (state, batchesAndItems) {
      state.batchesAndItems = batchesAndItems
    }
  },
  actions: {
  },
  modules: {
  }
})
