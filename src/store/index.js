import Vue from 'vue'
import Vuex from 'vuex'
import formModel from './modules/formModel'
import { formModels as config } from './formModels'


import * as assistant from '../assistant'


Vue.use(Vuex)

// 根据配置文件，创建规则依赖表
// let dep = assistant.findDependencies(config.formModels)
// config.dependencies = dep

const store = new Vuex.Store({
  state: {
    config: {},
    formValues: {}
  },

  mutations: {
    getFormModelConfig: (state, config) => {
      let dep = assistant.findDependencies(config.formModels)
      config.dependencies = dep
      state.config = config
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
      console.log('state.config', state.config.formModels['p1']);
      
      let j = JSON.stringify(state.config.formModels['p1']['form2']);
      Vue.set(state.config.formModels.p1, 'form3', JSON.parse(j));
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
