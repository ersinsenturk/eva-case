export default {
  namespaced: true,
  state: {
    dailySales: [],
    currency: null
  },
  mutations: {
    SET_DAILY_SALES(state, payload) {
      state.dailySales = payload
    },
    SET_CURRENCY(state, payload) {
      state.currency = payload
    }
  },
  actions: {
    setDailySales({ commit }, { sales, currency }) {
      commit('SET_DAILY_SALES', sales)
      commit('SET_CURRENCY', currency)
    }
  },
  getters: {}
}
