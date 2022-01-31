// postCSS配置文件

module.exports = {
  // 配置要使用发PostCSS插件
  plugins: {
    // autoprefixer插件 - 生成浏览器CSS样式规则前缀
    // VueClI内容已经配置了autoprefixer插件 会产生冲突 开服务器时候会有报错警告
    // 'autoprefixer': {
    //     // 配置要兼容到的环境信息
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // postcss-pxtorem 把px转成ress
    'postcss-pxtorem': {
      // lib-flexible 的ren适配方案 一行分为十分
      // 所以rootValue应该设置为设计稿的十分之一
      // vant是基于375写的
      // rootValue支持两种类型 number function
      // postcss-pxtorem处理每个CSS文件的时候都会调用这个文件 它会把处理的CSS文件相关的信息通过参数传递给该函数
      // rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性 *表示所有  （height只转换高）
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
