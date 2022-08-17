import { createStore } from 'vuex'

export default createStore({
  state: {
    items: null,
    batchesAndItems: null,
    stockOutAndItems: null
  },
  getters: {
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    },
    setBatchesAndItems (state, batchesAndItems) {
      state.batchesAndItems = batchesAndItems
    },
    setStockOutAndItems (state, stockOutAndItems) {
      state.stockOutAndItems = stockOutAndItems
    }
  },
  actions: {
  },
  modules: {
  }
})
