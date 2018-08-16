let targetRoot = 'http://localhost'
// let targetRoot = 'http://hq-app-test.zhongan.io/'
let targetRootTest = 'http://fosun-test.zaouter.com'
// let targetRootTest = 'http://localhost:9101'
// let targetRootTest = 'http://172.28.13.32:8010'
let port = require('../service/config').dev.port

module.exports = {
  '/devapi/**': {
    target: targetRoot + ':' + port,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/devapi': ''
    }
  },
  '/testapi/**': {
    target: targetRootTest,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/testapi': '/api'
    }
  }
}
