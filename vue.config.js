module.exports = {
  devServer: {
    host: 'localhost',
    port: 8888,
    disableHostCheck: true,
    proxy: {
      '^/freemarket': {
        target: 'http://192.168.1.3:8080/',
        changeOrigin: true
      }
    }

  },
  transpileDependencies: [
    'vuetify'
  ]
}
