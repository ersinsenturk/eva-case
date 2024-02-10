import { createStore } from 'vuex'
import auth from './auth'
import sales from './sales'

const store = createStore({
  modules: {
    auth,
    sales
  }
})

export default store
