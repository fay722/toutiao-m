module.exports = {
  configureWebpack: {},
  devServer: { // 环境配置
    host: '0.0.0.0',
    public: '192.168.31.141:8080', // 此处是自己电脑IP地址！
    port: '8082',
    https: false,
    disableHostCheck: true,
    open: true // 配置自动启动浏览器
  }
}
