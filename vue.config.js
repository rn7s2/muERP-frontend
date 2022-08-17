const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  "devServer": {
    "proxy": {
      "/api": {
        "target": 'http://127.0.0.1/api',
        "pathRewrite": { '^/api': '' },
        "changeOrigin": true,
        "secure": false
      }
    }
  }
})
