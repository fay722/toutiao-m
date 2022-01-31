import request from '@/utils/request'

// 获取所有频道
export const allChannels = () => request({
  url: '/v1_0/channels'
})

// 设置用户的频道（部分覆盖）
export const addUserChannel = (channel) => request({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [channel]
  }
})

// 删除指定用户频道
export const delUserChannel = (id) => request({
  url: `/v1_0/user/channels/${id}`,
  method: 'DELETE'
})
