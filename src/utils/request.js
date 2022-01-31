// 请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 接口基准路径
  baseURL: 'http://toutiao.itheima.net'
  // 接口文档http://toutiao.itheima.net/api.html
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意 这里必须返回config 否则请求出不去 会停在这里
  return config
}, function (error) {
  // 如果请求出错 还没有发出去 会进入这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
