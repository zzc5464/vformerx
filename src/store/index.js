import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import axios from 'axios'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'

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

function $$ (fieldName) {

}

// function BIRTHDAY_CHECK ('p1-form1-income', 'p2-form1-tax') {
//     if ($$(0) > $$(1)) {
//         return $$.pass()
//     } else {
//         return $$.fail(0, '父母的年龄小于子女的年龄') 
//     }
// }
//
//
// return $$('p1-form1-income') > $$('p2-form2-tax')

const json = [{
  fields: ['p1-form2-income', 'p2-form1-tax'],
  codes: `
    $$.set(0, $$(1));
    if ($$.number(0) > $$.number(1)) {
      return $$.pass()
    } else {
        return $$.fail(0, '父母的年龄小于子女的年龄') 
    }`
}, {
  fields: ['p1-form1-income2', 'p2-form1-tax'],
  codes: `
    if ($$.number(1) > $$.number(0)) {
        return $$.pass()
    } else {
        return $$.fail(0, '这是一个出错原因，哈哈哈') 
    }`
}]

function validate (callback, formValues, ...field) {
  function $$ (col) {
    if (field.length > col) {
      return formValues[field[col]]
    } else {
      return undefined
    }
  }

  for (let i=0; i<field.length; i++) {
    if (typeof $$(i) === 'undefined') {
      return {
        pass: true,
        ignore: true
      }
    }
  }

  $$.number = function (col) {
    return parseInt($$(col))
  }

  $$.fail = function (col, reason) {
    return {
      pass: false,
      field: field[col],
      reason: reason
    }
  }

  $$.pass = function () {
    return {
      pass: true
    }
  }

  return callback($$);
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
    dataUpdated (state, v) {
      for (let key in v.value) {
        state.formValues[`${v.name}-${key}`] = v.value[key];

        let sections = v.name.split('-');
        console.log(`[${sections[0]}][${sections[1]}][${key}]`);
        state.formModels[sections[0]][sections[1]][key].value = v.value[key];
      }

      console.log(state.formValues);

      let result = [];
      json.forEach((item) => {
        let callback = eval(`$$ => {${item.codes}}`);
        let ret = validate(callback, state.formValues, ...item.fields);
        if (!ret.pass) {
          result.push(ret);
        }
      })

      console.log(result)
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
  }
})

export default store
