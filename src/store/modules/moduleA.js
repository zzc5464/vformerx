const moduleA = {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    up (state, rootState) {
      state.count++
      console.log(rootState.count)
    },
    down (state) {
      state.count--
    }
  },
  actions: {
    up1 ({ commit }) {
      commit('up')
    },
    down1 ({ commit }) {
      commit('down')
    }
  },
  getters: {}
}