import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import axios from 'axios'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'
import formModel from './modules/formModel'
import { formModels, baseChecks } from './formModels'
import { Func1 } from './validators'

// import ui from './modules/ui'
// import { resolve } from 'url';

Vue.use(Vuex)

function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

/**
 * 校验函数
 * @param {callback} callback 执行配置中的校验代码
 * @param {Object} formValues 被校验值
 * @param {String|Number|Object} fieldValue 校验对比值
 * @param {String} field 校验对象地址 tips: p2-form1-tax
 */
function validate (callback, formValues, fieldValue, ...field) {
  function $$ (col) {
    function getFieldValue (col) {
      if (field.length > col) {
        return formValues[field[col]]
      } else {
        return undefined
      }
    }
    return col === 0 ? fieldValue : getFieldValue(col - 1);
  }
  
  for (let i = 0; i <= field.length; i++) {
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
/**
 * 赋值函数
 * @param {callback} callback 执行配置中的赋值代码
 * @param {Object} formValues 基准值
 * @param {String|Number|Object} fieldValue 修改值
 * @param {String} field 赋值对象地址 tips: p2-form1-tax
 */
function filler (callback, formValues, fieldValue, ...field) {
  console.log(callback, formValues, fieldValue, ...field);
}
/**
 * 获取表格的field 对象
 * @param {Object} state 
 * vuex数据
 * @param {callback} callback 
 * 返回field的值
 */
function mapFields (state, callback) {
  let models = state.formModels;
  for (let mKey in models) {
    for (let pKey in models[mKey]) {
      for (let fKey in models[mKey][pKey]) {
        callback(models[mKey][pKey][fKey]);
      }
    }
  }
}

const store = new Vuex.Store({
  state: {
    formModels: formModels,
    formValues: {}
  },

  mutations: {
    dataUpdated (state, v) {
      for (let key in v.value) {
        state.formValues[`${v.name}-${key}`] = v.value[key];

        let sections = v.name.split('-');
        let field = state.formModels[sections[0]][sections[1]][key];
        field.value = v.value[key];
      }
      mapFields(state, field => {
        let validators = field.validators;
        validators && validators.forEach((item) => {
          let callback = eval(`$$ => {${item.codes}}`);
          let ret = validate(callback, state.formValues, field.value, ...item.fields);
          item.baseChecks && item.baseChecks.forEach( (v,i) => {
            let callbackBaseChecks = eval(`$$ => {${baseChecks[v]}}`)
            let r = validate(callbackBaseChecks , state.formValues, field.value, ...item.fields)
          })
        })
        // // fillers
        // let fillers = field.fillers
        // fillers && fillers.forEach( v => {
        //   let callback = eval(`$$ => {${v.codes}}`)
        //   console.log(filler(callback,state.formValues, field.value, ...v.fillers))
        // })
      })
    },
    insert (state) {
      console.log('insert');
      let j = JSON.stringify(state.formModels['p1']['form1']);
      Vue.set(state.formModels.p1, 'form11', JSON.parse(j));
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
