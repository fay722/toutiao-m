import request from '@/utils/request'
// import store from '@/store'

export const userLogin = (data) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data
}
)
// 发送验证码
export const sendSms = (mobile) => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}` // es6拼接字符串
})

// 获取用户信息
export const getUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
  // 发送请求头数据
  // 该接口需要授权才能访问
  // headers: {
  //   // token的数据格式 Bearer后面有空格
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
  // 这里用户拦截器 不需要这样写了
})

// 获取用户频道列表
export const getUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 关注用户
export const addFollow = (target) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target
  }
})

// 取消关注
export const cancelFollow = (target) => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE'
})

// 获取用户关注列表
export const getUserFollowList = (params) => request({
  url: '/v1_0/user/followings',
  method: 'GET',
  params
})

// 获取用户收藏列表
export const getUserCollectList = (params) => request({
  url: '/v1_0/article/collections',
  method: 'GET',
  params
})

// 获取用户历史记录
export const getUserHistoryList = (params) => request({
  url: '/v1_0/user/histories',
  method: 'GET',
  params
})

// 获取用户个人资料
export const getUserProfile = () => request({
  url: '/v1_0/user/profile',
  method: 'GET'
})

// 编辑用户资料
export const editUserProfile = (data) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data
})

// 编辑头像
export const editUserPhoto = (data) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data
})
