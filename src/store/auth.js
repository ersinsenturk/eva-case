import { logoutUserApi } from '@/lib/services'

export default {
  namespaced: true,
  state: {
    user: null,
    token: null
  },
  mutations: {
    LOGIN_USER(state, payload) {
      state.user = payload.user
      state.token = payload.token
    },
    LOGOUT_USER(state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
    loginUser({ commit }, { user, token }) {
      commit('LOGIN_USER', { user, token })
    },
    async logoutUser({ commit }, token) {
      await logoutUserApi(token)
      commit('LOGOUT_USER')
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null
    }
  }
}
