export default {
  namespaced: true,
  state: {
    dailySales: [],
    currency: null,
    selectedSkuDate: [],
    skuList: {},
    selectedDays: 30,
    searchSkuTerm: ''
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
    },
    SET_SELECTED_DAYS(state, payload) {
      state.selectedDays = payload
    },
    SEARCH_SKU(state, payload) {
      state.searchSkuTerm = payload
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
    },
    setSelectedDays({ commit }, days) {
      commit('SET_SELECTED_DAYS', days)
    },
    searchSku({ commit }, sku) {
      commit('SEARCH_SKU', sku)
    }
  },
  getters: {
    getSelectedSkuDate(state) {
      return state.selectedSkuDate
    },
    getFilteredSku(state) {
      return state.skuList.data?.filter((item) =>
        item.sku.sku.toLowerCase().includes(state.searchSkuTerm.toLowerCase())
      )
    }
  }
}
