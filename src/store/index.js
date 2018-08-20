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
function validate (callback, formValues, thisField, ...field) {
  function $$ (col) {
    function getFieldValue (col) {
      if (field.length > col) {
        return formValues[field[col]]
      } else {
        
        return undefined
      }
    }

    return col === 0 ? thisField.value : getFieldValue(col - 1);
  }

  $$.type = function () {
    return thisField.type;
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
      reason,
      thisField
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

function findField(state, fieldName, callback) {
  let parts = fieldName.split('-');
  callback(state.formModels[parts[0]][parts[1]][parts[2]])
}

function findDependencies (formModels) {
  let dependencies = {}

  for (let mKey in formModels) {
    for (let pKey in formModels[mKey]) {
      for (let fKey in formModels[mKey][pKey]) {
        let field = formModels[mKey][pKey][fKey]
        let validators = field.validators || [];
        validators.forEach(validator => {
          let targetFields = validator.fields || []
          targetFields.forEach(target => {
            dependencies[target] = dependencies[target] || []
            dependencies[target].push({
              name: `${mKey}-${pKey}-${fKey}`,
              validator: validator.name     
            })
          })
        })
      }
    }
  }

  console.log('反映射表', dependencies);

  formModels.dependencies = dependencies;
  return formModels;
}

const store = new Vuex.Store({
  state: {
    formModels: findDependencies(formModels),
    // formModels: {},
    formValues: {},
    fieldName: ''
  },

  mutations: {
    getFormModelConfig: (state, config) => {
      
      state.formModels = config
      console.log('获取配置', state.formModels);
    },
    dataUpdated (state, obj) {
      let v = obj.v;
      let t = obj.t;

      if (JSON.stringify(v.value) === '{}') {
        return;
      }

      for (let key in v.value) {
        state.formValues[`${v.name}-${key}`] = v.value[key];

        let sections = v.name.split('-');
        
        let field = state.formModels[sections[0]][sections[1]][key];
        console.log(field);
        field.value = v.value[key];
      }
      if (t) {
        let fieldName = `${v.name}-${t}`;

        let templates = state.formModels.templates;

        console.log(`field: ${fieldName}`);

        findField(state, fieldName, field => {
  
          let validators = field.validators || [];
          validators && validators.forEach((item) => {

            let callback;

            if (item.template) {
              callback = eval(`$$ => {${templates[item.template]}}`)
            } else {
              callback = eval(`$$ => {${item.codes}}`)
            }

            let ret = validate(callback, state.formValues, field, ...item.fields);
            console.log(ret);
          })
          console.log(state.formModels.dependencies);
          
          let dependencies =  [];
          // let dependencies = state.formModels.dependencies[fieldName] || [];
          dependencies.forEach(dep => {
            findField(state, dep.name, field => {
              // console.log(field)
              let validators = field.validators || [];
              validators.forEach(validator => {
                if (validator.name === dep.validator) {
                  let callback;

                  if (validator.template) {
                    callback = eval(`$$ => {${templates[validator.template]}}`)
                  } else {
                    callback = eval(`$$ => {${validator.codes}}`)
                  }
      
                  let ret = validate(callback, state.formValues, field, ...validator.fields);
                  
                  console.log('ret', ret);
                }
              })
            })
          })
        })
      }

      // console.log(state.formValues);
    },

    eventUpdated (state, obj) {
      // console.log(obj);
      state.fieldName = obj.v.name;
    },

    resetEventUpdated (state) {
      console.log('clear cached fieldName');
      state.fieldName = '';
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
    },
    eventUpdated ({commit}, v) {
      commit('eventUpdated', v);
    },
    resetEventUpdated ({commit}) {
      commit('resetEventUpdated');
    }
  },
  modules: {
    formModel
  }
})

export default store
