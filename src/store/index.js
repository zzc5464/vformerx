import Vue from 'vue'
import Vuex from 'vuex'
import formModel from './modules/formModel'
import { formModels as config } from './formModels'


import * as assistant from '../assistant'


Vue.use(Vuex)

// 根据配置文件，创建规则依赖表
let dep = assistant.findDependencies(config.formModels)
config.dependencies = dep

const store = new Vuex.Store({
  state: {

    config: config,
    formValues: {}

  },

  mutations: {
    getFormModelConfig: (state, config) => {
      
      state.formModels = config
      console.log('获取配置', state.formModels);
    },
    dataUpdated (state, obj) {

      let data = obj.v;
      let page = obj.page;
      let name = obj.t;

      if (JSON.stringify(data.value) === '{}') {
          return;

      }

      assistant.save(state, page, data)
      assistant.validate(state, {
          page: page,
          form: data.name,
          name: name
      })
    },

    insert (state) {
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
