export default {
  namespaced: true,
  state: {
    dailySales: [],
    currency: null,
    selectedSkuDate: [],
    skuList: []
  },
  mutations: {
    SET_DAILY_SALES(state, payload) {
      state.dailySales = payload
    },
    SET_CURRENCY(state, payload) {
      state.currency = payload
    },
    SELECTED_SKU_DATE(state, payload) {
      state.selectedSkuDate = payload
    },
    SET_SKU_LIST(state, payload) {
      state.skuList = payload
    }
  },
  actions: {
    setDailySales({ commit }, { sales, currency }) {
      commit('SET_DAILY_SALES', sales)
      commit('SET_CURRENCY', currency)
    },
    setSelectedSku({ commit }, dates) {
      commit('SELECTED_SKU_DATE', dates)
    },
    setSkuList({ commit }, list) {
      commit('SET_SKU_LIST', list)
    }
  },
  getters: {
    getSelectedSkuDate(state) {
      return state.selectedSkuDate
    }
  }
}
