import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import axios from 'axios'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'
import formModel from './modules/formModel'
import { formModels } from './formModels'
import { Func1 } from './validators'

// import ui from './modules/ui'
// import { resolve } from 'url';

Vue.use(Vuex)

// const store = new Vuex.Store({
//   // actions,
//   // getters,
//   state: {
//     publicDictionary: ''
//   },
//   modules: {
//     ui
//   },
//   actions: {
//     getStore ({ commit, state }, bool) {
//       commit(types.LOADIND_STORE)
//     },
//     setStore ({ commit, state }) {
//       commit(types.SET_STORE)
//     },
//     dictionarStore ({ commit }, callback) {
//     }
//   },
//   mutations: {
//     [types.LOADIND_STORE] (state) {
//     },
//     [types.SET_STORE] (state) {
//     },
//     setDictionary (state, value) {
//     }
//   },
//   strict: false,
//   plugins: []
// })

function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const store = new Vuex.Store({
  state: {
    validators: [
      function () {
        return {
          pass: false,
          reason: '父母年龄小于本人年龄'
        }
      }
    ],
    formModels: formModels,
    formValues: {}
  },

  mutations: {
    validate (state, f1, f2) {
      let validators = [ Func1 ];
      validators.forEach((func) => {
        func(state, data, 'income', 'address')
      })
    },
    dataUpdated (state, v) {
      for (let key in v.value) {
        state.formValues[`${v.name}-${key}`] = v.value[key];
      }

      console.log(state.formValues);
    },
    insert (state) {
      state.formModels[0].push({
        button_group_2: {
          value: "",
          rules: {
            label: "button_group",
            type: "za-button_group",
            vRules: "required",
            options: [
              { name: "选项1", value: "aaa" },
              { name: "选项1", value: "ccc" },
              { name: "选项3", value: "bbb" }
            ]
          }
        }
      })
    }
  },
  actions: {
    insert ({ commit }) {
      commit('insert');
    },
    dataUpdated ({commit}, v) {
      commit('dataUpdated', v);
    }
  },
  modules: {
    formModel
  }
})

export default store
