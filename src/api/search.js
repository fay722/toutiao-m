import request from '@/utils/request'

// 获取搜索联想建议
export const getSuggest = q => request({
  method: 'GET',
  url: '/v1_0/suggestion',
  params: {
    q
  }
})

// 获取搜索结果
export const getResult = params => request({
  method: 'GET',
  url: '/v1_0/search',
  params
})
