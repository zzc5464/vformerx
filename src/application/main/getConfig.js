import {FORMMODELCONFIG} from '@/api'
let getConfig = function (app) {
  app.axios.post(FORMMODELCONFIG).then(({data}) => {
    app.$store.commit('getFormModelConfig', data.value)
  })
}
export default getConfig