import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间插件
dayjs.extend(relativeTime)
// dayjs默认是英文 我们这里配置为中文
dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器
// relativeTime过滤器名称 参数2是过滤器函数
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// console.log(dayjs().to('2012'))
