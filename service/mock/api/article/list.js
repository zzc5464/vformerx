const data = require('./list.json')
const dispatcher = function (payload) {
    return data.filter(item => item.name === payload.name)
}
const wrapper = function (value) {
    return {
        success: true,
        errorMsg: '',
        value
    }
}
module.exports = payload => wrapper(dispatcher(payload))