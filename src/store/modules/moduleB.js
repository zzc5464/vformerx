const moduleB = {
  state: {
    count: 0
  },
  mutations: {
    up (state) {
      state.count++
    },
    down (state) {
      state.count--
    }
  },
  actions: {
    up ({ commit }) {
      commit('up')
    },
    down ({ commit }) {
      commit('down')
    }
  },
  getters: {}
}